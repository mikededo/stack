import type { Client } from '@stack/supabase';

// Mutations

export type NewExpenseData = {
  amount: number;
  comment: string;
  date: string;
  page: number;
  id?: number;
  tags?: number[];
};
export const createExpense = async (
  client: Client,
  { page, ...data }: NewExpenseData
) => {
  const expense = { page_id: page, ...data };
  const query = client.schema('finances').from('expense');
  if (data.id) {
    return (await query.upsert([expense]).select().throwOnError()).data;
  }

  return (await query.insert(expense).select().throwOnError()).data;
};
