import type { Client } from '@mstack/svelte-supabase';

import type { QueryClient } from '@tanstack/svelte-query';
import { createMutation } from '@tanstack/svelte-query';

import { Keys } from '$lib/config';
import { type Book, type NewTagData, createTag, deleteTag } from '$lib/db';

type UseTagMutationArgs = {
  bookId: string;
  supabaseClient: Client;
  queryClient: QueryClient;
  onSettled?: () => void;
};
export const useCreateTag = ({
  bookId,
  supabaseClient,
  queryClient,
  onSettled
}: UseTagMutationArgs) =>
  createMutation({
    mutationFn: async (data: NewTagData) => await createTag(supabaseClient, data),
    onSuccess: (data) => {
      if (!data) {
        return;
      }

      queryClient.setQueryData<Book>(Keys.BOOK(bookId), (book) => {
        // TS check only
        if (!book) {
          return book;
        }

        const updated = { ...book };
        updated.tag = [...book.tag, data[0]];
        return updated;
      });
      queryClient.invalidateQueries({ queryKey: Keys.BOOK_TAGS(bookId) });
    },
    onSettled
  });

export const useDeleteTag = ({
  bookId,
  supabaseClient,
  queryClient,
  onSettled
}: UseTagMutationArgs) =>
  createMutation({
    mutationFn: async (tag: number) => await deleteTag(supabaseClient, tag),
    onSuccess: (data, tag) => {
      if (!data) {
        return;
      }

      queryClient.setQueryData<Book>(Keys.BOOK(bookId), (book) => {
        // TS check only
        if (!book) {
          return book;
        }

        const updated = { ...book };
        updated.tag = book.tag.filter(({ id }) => id !== tag);
        return updated;
      });
      queryClient.invalidateQueries({ queryKey: Keys.BOOK_TAGS(bookId) });
    },
    onSettled
  });
