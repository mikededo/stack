import type { BudgetPlan, BudgetPlanAllocation, BudgetPresets } from '$lib/db';

import { getContext, setContext } from 'svelte';

export type PresetAllocation = {
  amount: string;
  name: string;
  percentage: string;
  id?: `local-${number}` | number;
};
type PlanAllocation = {
  amount: null | number | string;
  id: `local-${number}` | number;
  name: string;
  percentage: null | number | string;
  budget_plan_id?: BudgetPlanAllocation['budget_plan_id'];
};

/**
 * The same state is used for both the plan and the preset allocations. Since we
 * have different components for each, we can keep the logic in the context helpers
 * functions, and each plan component can used the state without being coupled
 * to specific state.
 *
 * If the user uses a preset, the activePreset will be kept until the user saves
 * the plan, therefore all operations can rely on the activePreset value, to know
 * if the user is using a preset or not.
 */
type BudgetPlanState = {
  activePreset: BudgetPresets[number] | null;
  budget: string;
  name: string;
  planAllocations: PlanAllocation[]; // Differentiate state to simplify logic
  presetAllocations: PresetAllocation[];
  id?: number;
};

// Prefix with local so we can detect if we are updating an allocation or creating a new one
const randomLocalId = () => `local-${Math.floor(Math.random() * 10000)}` as const;

export const splitOrNumber = (value: number | string, split: string) =>
  typeof value === 'string' ? value.split(split) : [null, value];

const CONTEXT_KEY = 'budget-plan';

let state = $state<BudgetPlanState>({
  activePreset: null,
  budget: '',
  id: undefined,
  name: '',
  planAllocations: [{ amount: '', id: randomLocalId(), name: '', percentage: '' }],
  presetAllocations: [{ amount: '', id: randomLocalId(), name: '', percentage: '' }]
});

export const initBudgetPlanContext = () => setContext<BudgetPlanState>(CONTEXT_KEY, state);

export const getBudgetPlanContext = () => {
  const context = getContext<BudgetPlanState>(CONTEXT_KEY);
  if (!context) {
    throw new Error(
      'Unable to find budget plan context on the tree. Make sure to use `initBudgetPlanContext` on the root component.'
    );
  }

  return context;
};

// MODIFIERS

export const onNewAllocation = () => {
  if (state.id) {
    // Add to the plan allocations
    state.planAllocations = [
      ...state.planAllocations,
      { amount: '', id: randomLocalId(), name: '', percentage: '' }
    ];
    return;
  }

  state.presetAllocations = [
    ...state.presetAllocations,
    { amount: '', id: randomLocalId(), name: '', percentage: '' }
  ];
};

export const onChangeAllocationProperty
  = (i: number, property: 'amount' | 'name' | 'percentage') => (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (state.activePreset) {
      const updated = [...state.presetAllocations];
      updated[i][property] = target.value;
      state.presetAllocations = updated;
      return;
    }

    const updated = [...state.planAllocations];
    updated[i][property] = target.value;
    state.planAllocations = updated;
  };

export const onDeleteAllocation = (i: number) => () => {
  if (state.activePreset) {
    const updated = [...state.presetAllocations];
    updated.splice(i, 1);
    state.presetAllocations = updated;
    return;
  }

  const updated = [...state.planAllocations];
  updated.splice(i, 1);
  state.planAllocations = updated;
};

export const toggleActivePreset = (preset: BudgetPresets[number]) => {
  if (state.activePreset?.id === preset.id) {
    state.activePreset = null;
    return;
  }

  state.activePreset = preset;
};

export const applyActivePreset = () => {
  if (!state.activePreset) {
    return;
  }

  state.presetAllocations = state.activePreset.allocations.map(({ amount, name, percentage }) => ({
    amount: amount ? `€ ${amount}` : '',
    id: randomLocalId(),
    name,
    percentage: percentage ? `% ${percentage}` : ''
  }));
  state.name = state.activePreset.name;
};

export const onToggleSavedPlan = (plan: BudgetPlan) => {
  if (state.id === plan.id) {
    removeActivePlan();
    return;
  }

  state.planAllocations = plan.allocations;
  state.name = plan.name;
  state.budget = `€ ${plan.total_income}`;
  state.id = plan.id;
};

export const removeActivePlan = () => {
  // When toggled, we simply remove the id and also remove the id from the allocations
  state.id = undefined;
  state.planAllocations = state.planAllocations.map(({ amount, name, percentage }) => ({
    amount,
    budget_plan_id: undefined,
    id: randomLocalId(),
    name,
    percentage
  }));
};

// HELPERS

export const getAllocations = () =>
  state.activePreset ? state.presetAllocations : state.planAllocations;

export const areAllocationNamesValid = () => getAllocations().every(({ name }) => !!name);

export const totalSalaryAllocated = () => {
  if (state.budget === '' || Number(state.budget) === 0) {
    return 0;
  }

  const allocations = state.planAllocations.length
    ? state.planAllocations
    : state.presetAllocations;
  const total = allocations.reduce(
    (acc, { amount, percentage }) => acc + getAllocationPercentage(percentage, amount),
    0
  );

  return total.toFixed(0);
};

export const getAllocationPercentage = (
  percentage?: null | number | string,
  amount?: null | number | string
) => {
  if (!percentage && !amount) {
    return 0;
  }

  if (percentage) {
    const [, value] = splitOrNumber(percentage, '% ');
    return Number(value);
  }

  const [, value] = splitOrNumber(amount!, '€ ');
  const [, budget] = state.budget.split('€ ');
  return (Number(value) / Number(budget)) * 100;
};

export const getAmountPlaceholder = (percentage?: null | number | string) => {
  if (!percentage) {
    return '€ 450';
  }

  const [, budget] = state.budget.split('€ ');
  if (!budget) {
    return '€ 450';
  }

  const [, value] = splitOrNumber(percentage, '% ');

  return `€ ${(Number(budget) * Number(value)) / 100}`;
};

export const getPercentagePlaceholder = (amount?: null | number | string) => {
  if (!amount) {
    return '50%';
  }

  const [, value] = splitOrNumber(amount, '€ ');
  if (!value) {
    return '50%';
  }

  const [, budget] = state.budget.split('€ ');
  return `${Math.min((Number(value) / Number(budget)) * 100, 100)}%`;
};

export const isAmountOverBudget = (amount?: null | number | string) => {
  if (!amount) {
    return false;
  }

  const [, value] = splitOrNumber(amount, '€ ');
  if (!value) {
    return false;
  }

  const [, budget] = state.budget.split('€ ');
  return Number(value) > Number(budget);
};
