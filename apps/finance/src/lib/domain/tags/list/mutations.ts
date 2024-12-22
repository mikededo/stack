import type { Client } from '@stack/supabase';
import type { QueryClient } from '@tanstack/svelte-query';

import { createMutation } from '@tanstack/svelte-query';
import { Keys } from '$lib/config';
import {
  type Book,
  createTag,
  deleteTag,
  type NewTagData,
  type Tag,
  updateTag,
  type UpdateTagData
} from '$lib/db';

type UseTagMutationArgs = {
  queryClient: QueryClient;
  supabaseClient: Client;
  bookId: string;
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

const useCreateTag = ({
  bookId,
  onSettled,
  queryClient,
  supabaseClient
}: UseTagMutationArgs) =>
  createMutation({
    mutationFn: async (data: NewTagData) =>
      await createTag(supabaseClient, data),
    onSettled,
    onSuccess: (data) => {
      if (!data) {
        return;
      }

      updateBookTagsAndInvalidate(queryClient, bookId, tags => [
        ...tags,
        data[0]
      ]);
    }
  });

const useUpdateTag = ({
  bookId,
  onSettled,
  queryClient,
  supabaseClient
}: UseTagMutationArgs) =>
  createMutation({
    mutationFn: async (data: UpdateTagData) =>
      await updateTag(supabaseClient, data),
    onSettled,
    onSuccess: (data, { id }) => {
      if (!data) {
        return;
      }

      updateBookTagsAndInvalidate(queryClient, bookId, tags =>
        tags.map(tag => (tag.id === id ? { ...tag, ...data[0] } : tag)));
    }
  });

const useDeleteTag = ({
  bookId,
  onSettled,
  queryClient,
  supabaseClient
}: UseTagMutationArgs) =>
  createMutation({
    mutationFn: async (tag: number) => await deleteTag(supabaseClient, tag),
    onSettled,
    onSuccess: (data, tag) => {
      if (!data) {
        return;
      }

      updateBookTagsAndInvalidate(queryClient, bookId, tags =>
        tags.filter(({ id }) => id !== tag));
    }
  });

export const useTagMutations = (args: UseTagMutationArgs) => {
  const createTagMutation = useCreateTag(args);
  const updateTagMutation = useUpdateTag(args);
  const deleteTagMutation = useDeleteTag(args);

  return {
    createTagMutation,
    deleteTagMutation,
    updateTagMutation
  };
};
