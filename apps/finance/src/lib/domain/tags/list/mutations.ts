import type { Client } from '@mstack/svelte-supabase';

import type { QueryClient } from '@tanstack/svelte-query';
import { createMutation } from '@tanstack/svelte-query';

import { Keys } from '$lib/config';
import {
  type Book,
  type NewTagData,
  type Tag,
  type UpdateTagData,
  createTag,
  deleteTag,
  updateTag
} from '$lib/db';

type UseTagMutationArgs = {
  bookId: string;
  supabaseClient: Client;
  queryClient: QueryClient;
  onSettled?: () => void;
};

const updateBookTagsAndInvalidate = (
  queryClient: QueryClient,
  bookId: string,
  updater: (tags: Tag[]) => Tag[]
) => {
  queryClient.setQueryData<Book>(Keys.BOOK(bookId), (book) => {
    if (!book) {
      return book;
    }

    const updated = { ...book };
    updated.tag = updater(book.tag);
    return updated;
  });

  queryClient.invalidateQueries({ queryKey: Keys.BOOK_TAGS(bookId) });
};

const useCreateTag = ({ bookId, supabaseClient, queryClient, onSettled }: UseTagMutationArgs) =>
  createMutation({
    mutationFn: async (data: NewTagData) => await createTag(supabaseClient, data),
    onSuccess: (data) => {
      if (!data) {
        return;
      }

      updateBookTagsAndInvalidate(queryClient, bookId, (tags) => [...tags, data[0]]);
    },
    onSettled
  });

const useUpdateTag = ({ bookId, supabaseClient, queryClient, onSettled }: UseTagMutationArgs) =>
  createMutation({
    mutationFn: async (data: UpdateTagData) => await updateTag(supabaseClient, data),
    onSuccess: (data, { id }) => {
      if (!data) {
        return;
      }

      updateBookTagsAndInvalidate(queryClient, bookId, (tags) =>
        tags.map((tag) => (tag.id === id ? { ...tag, ...data[0] } : tag))
      );
    },
    onSettled
  });

const useDeleteTag = ({ bookId, supabaseClient, queryClient, onSettled }: UseTagMutationArgs) =>
  createMutation({
    mutationFn: async (tag: number) => await deleteTag(supabaseClient, tag),
    onSuccess: (data, tag) => {
      if (!data) {
        return;
      }

      updateBookTagsAndInvalidate(queryClient, bookId, (tags) =>
        tags.filter(({ id }) => id !== tag)
      );
    },
    onSettled
  });

export const useTagMutations = (args: UseTagMutationArgs) => {
  const createTagMutation = useCreateTag(args);
  const updateTagMutation = useUpdateTag(args);
  const deleteTagMutation = useDeleteTag(args);

  return {
    createTagMutation,
    updateTagMutation,
    deleteTagMutation
  };
};
