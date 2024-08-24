import { type Client, type Result, withUnauthorizedRedirect } from '@stack/svelte-supabase';

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
