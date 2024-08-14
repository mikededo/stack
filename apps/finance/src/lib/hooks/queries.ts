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
  getPinnedPages,
  type PinnedPages,
  pinPage,
  unpinPage
} from '$lib/db';

/**
 * This includes hooks that are re-used at the app level. In order to keep things more
 * scoped and organised, try to keep specific hooks in the domain
 */

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
export const usePinPage = (client: Client, queryClient: QueryClient) =>
  createMutation({
    mutationFn: async (page: number) => await pinPage(client, page),
    onSuccess: (data) => {
      if (!data) {
        return;
      }

      const newPin = data[0];
      if (!newPin) {
        return;
      }

      queryClient.setQueryData<PinnedPages>(Keys.PINNED_PAGES, (prev) => {
        if (!prev) {
          return prev;
        }

        return [newPin, ...prev];
      });
    }
  });
export const useUnpinPage = (client: Client, queryClient: QueryClient) =>
  createMutation({
    mutationFn: async (page: number) => await unpinPage(client, page),
    onSuccess: (_, page) => {
      queryClient.setQueryData<PinnedPages>(Keys.PINNED_PAGES, (prev) => {
        if (!prev) {
          return prev;
        }

        return prev.filter(({ page: current }) => current?.id !== page);
      });
    }
  });
export const useClickPinnedPage = (client: Client, queryClient: QueryClient) =>
  createMutation({
    mutationFn: async ({ page, userId }: ClickPinnedPageData) =>
      await clickPinnedPage(client, { page, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: Keys.PINNED_PAGES });
    }
  });
