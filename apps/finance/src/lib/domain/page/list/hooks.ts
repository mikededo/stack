import { getSupabaseClient } from '@stack/svelte-supabase';

import { createMutation, useQueryClient } from '@tanstack/svelte-query';

import { Keys } from '$lib/config';
import { type BooksWithPages, createPage, type NewPageData } from '$lib/db';
import { usePinnedPages as usePinnedPagesQuery, usePinPage, useUnpinPage } from '$lib/hooks';

export const usePinnedPages = () => {
  const queryClient = useQueryClient();
  const supabase = getSupabaseClient();

  const query = usePinnedPagesQuery(supabase);
  const pin = usePinPage(supabase, queryClient);
  const unpin = useUnpinPage(supabase, queryClient);

  return { pin, query, unpin };
};

export const useCreatePage = () => {
  const queryClient = useQueryClient();
  const supabaseClient = getSupabaseClient();

  return createMutation({
    mutationFn: async (data: NewPageData) => await createPage(supabaseClient, data),
    onSuccess: (data) => {
      if (!data) {
        return;
      }

      queryClient.setQueryData<BooksWithPages>(Keys.BOOKS, (prevBooks) => {
        // TS check only
        if (!prevBooks) {
          return prevBooks;
        }

        return prevBooks.map((book) => {
          if (book.id !== book.id) {
            return book;
          }

          const pages = [...book.page, data[0]].filter((page) => page.id !== 0);
          return { ...book, page: pages };
        });
      });
    }
  });
};
