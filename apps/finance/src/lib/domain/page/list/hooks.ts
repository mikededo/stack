import { getSupabaseClient } from '@stack/supabase';

import { createMutation, useQueryClient } from '@tanstack/svelte-query';

import { Keys } from '$lib/config';
import {
  type Book,
  type BooksWithPages,
  createPage,
  type NewPageData
} from '$lib/db';
import {
  usePinnedPages as usePinnedPagesQuery,
  usePinPage,
  useUnpinPage
} from '$lib/hooks';

export const usePinnedPages = () => {
  const query = usePinnedPagesQuery();
  const pin = usePinPage();
  const unpin = useUnpinPage();

  return { pin, query, unpin };
};

export const useCreatePage = () => {
  const queryClient = useQueryClient();
  const supabaseClient = getSupabaseClient();

  return createMutation({
    mutationFn: async (data: NewPageData) =>
      await createPage(supabaseClient, data),
    onSuccess: (data) => {
      if (!data) {
        return;
      }

      const page = data[0];
      queryClient.setQueryData<BooksWithPages>(Keys.BOOKS, (prevBooks) => {
        // TS check only
        if (!prevBooks) {
          return prevBooks;
        }

        return prevBooks.map((book) => {
          if (page.book_id !== book.id) {
            return book;
          }

          const pages = [...book.page, page].filter((page) => page.id !== 0);
          return { ...book, page: pages };
        });
      });
      queryClient.setQueryData<Book>(Keys.BOOK(`${page.book_id}`), (book) => {
        if (!book) {
          return book;
        }

        const updated = { ...book };
        updated.page = [...updated.page, page];
        return updated;
      });
    }
  });
};
