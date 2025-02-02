import { getSupabaseClient } from '@stack/supabase';

import type { BooksWithPages } from '$lib/db';

import {
  createMutation,
  createQuery,
  useQueryClient
} from '@tanstack/svelte-query';

import { Keys } from '$lib/config';
import {

  createBook,
  getBook,
  getBooksWithPages,
  getBookTags,
  getPage
} from '$lib/db';

export const useBook = (book: string) => {
  const client = getSupabaseClient();

  return createQuery({
    queryFn: () => getBook(client, +book),
    queryKey: Keys.BOOK(book)
  });
};

export const useBookPage = (book: string, page: string) => {
  const client = getSupabaseClient();
  return createQuery({
    queryFn: () => getPage(client, +page),
    queryKey: Keys.PAGE(book, page)
  });
};

export const useBookTags = (book: string) => {
  const client = getSupabaseClient();

  return createQuery({
    queryFn: () => getBookTags(client, +book),
    queryKey: Keys.BOOK_TAGS(book)
  });
};

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
