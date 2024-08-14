import type { MutationResult } from '@mstack/utils';

import { type Client } from '@mstack/svelte-supabase';

import { createMutation, type QueryClient } from '@tanstack/svelte-query';

import { Keys } from '$lib/config';
import { createExpense, type Expense, type Page } from '$lib/db';

// FIXME: Omitting tags as not yet implemented
const updateExistingExpense =
  (updatedExpense: Omit<Expense, 'created_by' | 'tags'>) => (expense: Expense) =>
    updatedExpense.id === expense.id ? { ...expense, ...updatedExpense } : expense;

type MutationContext = { cachedPage: null | Page; isNewExpense: boolean };
type UseExpenseMutationArgs = {
  bookId?: number;
  client: Client;
  onMutate?: () => void;
  onSettled?: () => void;
  queryClient: QueryClient;
  userId: string;
};
type Result = MutationResult<typeof createExpense, MutationContext>;
export const useExpenseMutation = ({
  bookId,
  client,
  onMutate,
  onSettled,
  queryClient,
  userId
}: UseExpenseMutationArgs): Result =>
  createMutation({
    mutationFn: async (data) => {
      // Supabase expects mm/dd/yyyy and we provide dd/mm/yyyy
      const date = data.date.split('/');
      const month = date[1];
      date[1] = date[0];
      date[0] = month;

      return await createExpense(client, { ...data, date: date.join('/') });
    },
    // FIXME: Find a better mutationkey
    mutationKey: ['upsertExpense'],
    onError: (_, __, context) => {
      // TODO: Handle global error - probably outside of the mutation
      if (!context || !context.cachedPage) {
        // Nothing to be done
        return;
      }

      // Restablish page, as the query failed and the new expense has not been added
      queryClient.setQueryData(
        Keys.PAGE(`${bookId}`, `${context.cachedPage.id}`),
        context.cachedPage
      );
    },
    onMutate: (expense) => {
      const queryKey = Keys.PAGE(`${bookId}`, `${expense.page}`);
      // Snapshot the previous value
      const cachedPage = queryClient.getQueryData<Page>(queryKey);
      const optimisticExpense: Expense = {
        ...expense,
        created_at: new Date().toISOString(),
        created_by: userId,
        id: expense.id ?? 0,
        page_id: expense.page,
        tags: []
      };

      // TODO: Handle empty case
      if (!cachedPage) {
        return { cachedPage: null, isNewExpense: false };
      }

      if (optimisticExpense.id) {
        queryClient.setQueryData<Page>(queryKey, {
          ...cachedPage,
          expenses: cachedPage.expenses.map(updateExistingExpense(optimisticExpense))
        });
      } else if (expense.id === 0) {
        // New expense has id set to 0
        queryClient.setQueryData<Page>(queryKey, {
          ...cachedPage,
          // FIXME: Currently all new expenses are appended, but in the future
          // they will have a position and should be inserted at that position
          expenses: [...cachedPage.expenses, optimisticExpense]
        });
      }

      onMutate?.();

      return { cachedPage, isNewExpense: !!expense.id };
    },
    // Always refetch after error or success:
    onSettled: () => {
      // In their docs they recommened invalidating the query so that it's refetched...
      // I'm not sure if this is the best approach, as the logic is not that hard so that
      // I can ensure integrity
      onSettled?.();
    },
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
        updated.expenses = prev.expenses.map(updateExistingExpense(newExpense));
        return updated;
      });
    }
  });
