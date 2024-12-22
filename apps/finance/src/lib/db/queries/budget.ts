import {
  type Client,
  type Result,
  withUnauthorizedRedirect
} from '@stack/supabase';

export const getBudgetPlansQuery = (client: Client) =>
  client
    .schema('finances')
    .from('budget_plan')
    .select('*, allocations:budget_allocation(*)');
export const getBudgetPlans = async (client: Client) =>
  (await withUnauthorizedRedirect(client, await getBudgetPlansQuery(client)))
    .data;
export type BudgetPlans = Result<typeof getBudgetPlansQuery>;
export type BudgetPlan = BudgetPlans[number];
export type BudgetPlanAllocation = BudgetPlan['allocations'][number];

export const getBudgetPresetsQuery = (client: Client) =>
  client
    .schema('finances')
    .from('preset_budget_plan')
    .select('*, allocations:preset_budget_allocation(*)')
    .order('created_at', { ascending: false });
export const getBudgetPresets = async (client: Client) =>
  (await withUnauthorizedRedirect(client, await getBudgetPresetsQuery(client)))
    .data;
export type BudgetPresets = Result<typeof getBudgetPresetsQuery>;

export type NewBudgetAllocationData = {
  id: null | number;
  name: string;
  percentage: null | number;
  amount: null | number;
  // Budget plan id is not required as the plan id cannot be updated
};
export type BudgetPlanData = {
  budget: number;
  id: null | number;
  name: string;
  allocations: NewBudgetAllocationData[];
};

// MUTATIONS

export const upsertBudgetPlan = async (
  client: Client,
  { allocations, budget, id, name }: BudgetPlanData
) => {
  const args = id
    ? {
        allocations,
        plan_id: id,
        plan_name: name,
        plan_total_income: budget
      }
    : {
        allocations,
        name,
        total_income: budget
      };
  return (
    await client
      .schema('finances')
      .rpc(id ? 'update_budget_plan' : 'create_budget_plan', args)
      .select()
      .throwOnError()
  ).data;
};

export const deleteBudgetPlan = async (client: Client, id: number) =>
  await client
    .schema('finances')
    .from('budget_plan')
    .delete()
    .eq('id', id)
    .select()
    .throwOnError();
