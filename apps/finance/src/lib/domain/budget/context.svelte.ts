import { getContext, setContext } from 'svelte';

export type Allocation = {
  amount: string;
  id?: number;
  name: string;
  percentage: string;
};

type BudgetPlanState = {
  allocations: Allocation[];
  budget: string;
  name: string;
};

const randomLocalId = () => Math.floor(Math.random() * 1000);

const CONTEXT_KEY = 'budget-plan';

let state = $state<BudgetPlanState>({
  allocations: [{ amount: '', id: randomLocalId(), name: '', percentage: '' }],
  budget: '',
  name: ''
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
  state.allocations = [
    ...state.allocations,
    { amount: '', id: randomLocalId(), name: '', percentage: '' }
  ];
};

export const onChangeAllocationProperty =
  (i: number, property: keyof Omit<Allocation, 'id'>) => (event: Event) => {
    const target = event.target as HTMLInputElement;
    const updated = [...state.allocations];
    updated[i][property] = target.value;
    state.allocations = updated;
  };

export const onDeleteAllocation = (i: number) => () => {
  const updated = [...state.allocations];
  updated.splice(i, 1);
  state.allocations = updated;
};

export const totalSalaryAllocated = () => {
  if (state.budget === '' || Number(state.budget) === 0) {
    return 0;
  }

  const total = state.allocations.reduce(
    (acc, { amount, percentage }) => acc + getAllocationPercentage(percentage, amount),
    0
  );

  return total.toFixed(total === 0 || total === 100 ? 0 : 2);
};

// HELPERS

export const areAllocationNamesValid = () => state.allocations.every(({ name }) => !!name);

export const getAllocationPercentage = (
  percentage: string | undefined,
  amount: string | undefined
) => {
  if (!percentage && !amount) {
    return 0;
  }

  if (percentage) {
    const [, value] = percentage.split('% ');
    return Number(value);
  }

  const [, value] = amount!.split('€ ');
  const [, budget] = state.budget.split('€ ');
  return (Number(value) / Number(budget)) * 100;
};

export const getAmountPlaceholder = (percentage: string | undefined) => {
  if (!percentage) {
    return '€ 450';
  }

  const [, budget] = state.budget.split('€ ');
  if (!budget) {
    return '€ 450';
  }

  const [, value] = percentage.split('% ');

  return `€ ${(Number(budget) * Number(value)) / 100}`;
};

export const getPercentagePlaceholder = (amount: string | undefined) => {
  if (!amount) {
    return '50%';
  }

  const [, value] = amount.split('€ ');
  if (!value) {
    return '50%';
  }

  const [, budget] = state.budget.split('€ ');
  return `${(Number(value) / Number(budget)) * 100}%`;
};
