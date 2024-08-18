// FIXME: This file is a mess, needs to be refactored
import type { QueryClient } from '@tanstack/svelte-query';

import { type Client, getSupabaseClient } from '@stack/svelte-supabase';

import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';

import { Keys } from '$lib/config';
import {
  clickPinnedPage,
  type ClickPinnedPageData,
  getBook,
  getBookTags,
  getLastAccessedPages,
  getPage,
  getPinnedPages,
  type PinnedPages,
  pinPage,
  trackPageView,
  unpinPage
} from '$lib/db';

/**
 * This includes hooks that are re-used at the app level. In order to keep things more
 * scoped and organised, try to keep specific hooks in the domain
 */

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

export const useLastViewedPages = () => {
  const supabase = getSupabaseClient();

  return createQuery({
    queryFn: () => getLastAccessedPages(supabase),
    queryKey: Keys.LAST_VIEWED_PAGES
  });
};
export const useTrackViewedPage = () => {
  const queryClient = useQueryClient();
  const supabase = getSupabaseClient();

  return createMutation({
    mutationFn: async (page: number) => await trackPageView(supabase, page),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: Keys.LAST_VIEWED_PAGES });
    }
  });
};
