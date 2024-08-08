import type { Client } from '@mstack/svelte-supabase';

import { type QueryClient, createMutation } from '@tanstack/svelte-query';

import { Keys } from '$lib/config';
import { type NewExpenseData, type Page, createExpense } from '$lib/db';

type UseExpenseMutationArgs = {
  client: Client;
  queryClient: QueryClient;
  bookId?: number;
  onMutate?: () => void;
  onSettled?: () => void;
};
export const useExpenseMutation = ({
  bookId,
  client,
  queryClient,
  ...options
}: UseExpenseMutationArgs) =>
  createMutation({
    mutationFn: async (data: NewExpenseData) => await createExpense(client, data),
    ...options,
    onSuccess: (data) => {
      if (!data || !bookId) {
        return;
      }

      const newExpense = data[0];
      queryClient.setQueryData<Page>(Keys.PAGE(`${bookId}`, `${newExpense.page_id}`), (prev) => {
        if (!prev) {
          return prev;
        }

        const updated = { ...prev };
        updated.expenses = prev.expenses.map((expense) => {
          if (expense.id === newExpense.id) {
            return { ...expense, ...newExpense };
          }

          return expense;
        });
        return updated;
      });
    }
  });
