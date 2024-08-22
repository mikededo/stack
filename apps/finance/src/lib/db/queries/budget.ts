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
