import type { Client } from '@stack/svelte-supabase';

// Mutations

export type ExpenseTag = { expense: number; tag: number };
export const addExpenseTag = async (client: Client, { expense, tag }: ExpenseTag) =>
  await client
    .schema('finances')
    .from('expenses_tags')
    .insert([{ expense_id: expense, tag_id: tag }])
    .throwOnError();
export const removeExpenseTag = async (client: Client, { expense, tag }: ExpenseTag) =>
  await client
    .schema('finances')
    .from('expenses_tags')
    .delete()
    .eq('expense_id', expense)
    .eq('tag_id', tag)
    .throwOnError();
