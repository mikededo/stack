import { getSupabaseClient } from '@stack/svelte-supabase';

import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';

import { Keys } from '$lib/config';
import { type BooksWithPages, createBook, getBooksWithPages } from '$lib/db';

export const useBooks = () => {
  const client = getSupabaseClient();

  return createQuery({
    queryFn: () => getBooksWithPages(client),
    queryKey: Keys.BOOKS
  });
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  const supabaseClient = getSupabaseClient();

  return createMutation({
    mutationFn: async (name: string) => await createBook(supabaseClient, name),
    onSuccess: (data) => {
      if (!data) {
        return;
      }

      queryClient.setQueryData<BooksWithPages>(Keys.BOOKS, (prevBooks) => {
        // TS check only
        if (!prevBooks) {
          return prevBooks;
        }

        return [...prevBooks, { ...data[0], page: [] }];
      });
    }
  });
};
