import type { Client } from '@mstack/svelte-supabase';

import type { QueryClient } from '@tanstack/svelte-query';

import { createMutation, createQuery } from '@tanstack/svelte-query';

import { Keys } from '$lib/config';
import {
  clickPinnedPage,
  type ClickPinnedPageData,
  getBook,
  getBooksWithPages,
  getBookTags,
  getPage,
  getPinnedPages
} from '$lib/db';

export const useBooks = (client: Client) =>
  createQuery({
    queryFn: () => getBooksWithPages(client),
    queryKey: Keys.BOOKS
  });

export const useBook = (client: Client, book: string) =>
  createQuery({
    queryFn: () => getBook(client, +book),
    queryKey: Keys.BOOK(book)
  });

export const useBookPages = (client: Client, book: string, page: string) =>
  createQuery({
    queryFn: () => getPage(client, +page),
    queryKey: Keys.PAGE(book, page)
  });

export const useBookTags = (client: Client, book: string) =>
  createQuery({
    queryFn: () => getBookTags(client, +book),
    queryKey: Keys.BOOK_TAGS(book)
  });

export const usePinnedPages = (client: Client) =>
  createQuery({
    queryFn: () => getPinnedPages(client),
    queryKey: Keys.PINNED_PAGES
  });
export const useClickPinnedPage = (client: Client, queryClient: QueryClient) =>
  createMutation({
    mutationFn: async ({ page, userId }: ClickPinnedPageData) =>
      await clickPinnedPage(client, { page, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: Keys.PINNED_PAGES });
    }
  });
