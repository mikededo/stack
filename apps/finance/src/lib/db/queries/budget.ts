import { type Client, type Result, withUnauthorizedRedirect } from '@stack/svelte-supabase';

export const getBudgetPlansQuery = (client: Client) =>
  client.schema('finances').from('budget_plan').select('*, allocations:budget_allocation(*)');
export const getBudgetPlans = async (client: Client) =>
  (await withUnauthorizedRedirect(client, await getBudgetPlansQuery(client))).data;
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
  (await withUnauthorizedRedirect(client, await getBudgetPresetsQuery(client))).data;
export type BudgetPresets = Result<typeof getBudgetPresetsQuery>;

export type NewBudgetAllocationData = {
  amount: null | number;
  name: string;
  percentage: null | number;
};
export type NewBudgetPlanData = {
  allocations: NewBudgetAllocationData[];
  budget: number;
  name: string;
};

export const createBudgetPlan = async (
  client: Client,
  { allocations, budget, name }: NewBudgetPlanData
) =>
  (
    await client
      .schema('finances')
      .rpc('create_budget_plan', {
        allocations,
        name,
        total_income: budget
      })
      .select()
      .throwOnError()
  ).data;
