import type { MutationResult } from '@stack/utils';

import { getSupabaseClient } from '@stack/supabase';

import type { Expense, Page, Tag } from '$lib/db';

import {
  createMutation,
  type CreateMutationOptions,
  type QueryClient,
  useQueryClient
} from '@tanstack/svelte-query';

import { Keys } from '$lib/config';
import { addExpenseTag, removeExpenseTag } from '$lib/db';

type ExpenseTagModified = { expense: number; tag: number };

type MutationContext = {
  fallback: Page | undefined;
  updated: Page | undefined;
};
type Result<T extends (...args: any) => any> = MutationResult<
  T,
  MutationContext
>;
type OnError = CreateMutationOptions<
  unknown,
  Error,
  ExpenseTagModified,
  MutationContext
>['onError'];
type UseExpenseTagsModifiersArgs = {
  /**
   * Book id is required to be able to get the tags from the cached book tags query
   */
  book: number;
  /**
   * Page being modified, required to know the page to update
   */
  page: number;
};

// The hook allows to add/remove a tag from an expense, while also updating the
// query that renders the expenses list optimistically. The idea is to avoid
// having to refetch the entire book pages, as the query is quite heavy (it fetches
// all the information from a single page, including the expenses)
// Therefore, we need to search for the expense in the query and then update the
// tags from such expense

const addExpenseTagMapper =
  (expenseId: number, tag: Tag) =>
    (expense: Expense): Expense => {
      if (expense.id !== expenseId) {
        return expense;
      }

      return { ...expense, tags: [...expense.tags, tag] };
    };
const removeExpenseTagMapper =
  (expenseId: number, tagId: number) =>
    (expense: Expense): Expense => {
      if (expense.id !== expenseId) {
        return expense;
      }

      return {
        ...expense,
        tags: expense.tags.filter(tag => tag.id !== tagId)
      };
    };

const pageUpdater = (page: Page, mapper: (tag: Expense) => Expense) => ({
  ...page,
  expenses: page.expenses.map(mapper)
});

const onResetContext =
  (queryClient: QueryClient, book: number, page: number): OnError =>
    (_, __, context) => {
      if (!context || !context.fallback) {
        return;
      }

      queryClient.setQueryData<Page>(
        Keys.PAGE(`${book}`, `${page}`),
        context.fallback
      );
    };

export const useExpenseTagsModifiers = ({
  book,
  page
}: UseExpenseTagsModifiersArgs) => {
  const client = getSupabaseClient();
  const queryClient = useQueryClient();
  const onError = onResetContext(queryClient, book, page);

  const add: Result<typeof addExpenseTag> = createMutation({
    mutationFn: async (data: ExpenseTagModified) => addExpenseTag(client, data),
    onError,
    // We want to optimistically remove the tag from the expense
    onMutate: ({ expense: expenseId, tag: tagId }) => {
      // Get the tags
      const tags = queryClient.getQueryData<Tag[]>(Keys.BOOK_TAGS(`${book}`));
      const tag = tags?.find(tag => tag.id === tagId);
      if (!tag) {
        // This sould never happen, but just in case
        return;
      }

      // Optimistically remove the tag from the expens
      const fallback = queryClient.getQueryData<Page>(
        Keys.PAGE(`${book}`, `${page}`)
      );
      const updated = queryClient.setQueryData<Page>(
        Keys.PAGE(`${book}`, `${page}`),
        (data) => {
          if (!data) {
            return data;
          }

          return pageUpdater(data, addExpenseTagMapper(expenseId, tag));
        }
      );

      return { fallback, updated };
    }
  });

  const remove: Result<typeof removeExpenseTag> = createMutation({
    mutationFn: async (data: ExpenseTagModified) =>
      removeExpenseTag(client, data),
    onError,
    // We want to optimistically remove the tag from the expense
    onMutate: ({ expense: expenseId, tag: tagId }) => {
      // Optimistically remove the tag from the expens
      const fallback = queryClient.getQueryData<Page>(
        Keys.PAGE(`${book}`, `${page}`)
      );
      const updated = queryClient.setQueryData<Page>(
        Keys.PAGE(`${book}`, `${page}`),
        (data) => {
          if (!data) {
            return data;
          }

          return pageUpdater(data, removeExpenseTagMapper(expenseId, tagId));
        }
      );

      return { fallback, updated };
    }
  });

  return { add, remove };
};
