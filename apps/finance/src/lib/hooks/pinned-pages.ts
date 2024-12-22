import { getSupabaseClient } from '@stack/supabase';
import {
  createMutation,
  createQuery,
  useQueryClient
} from '@tanstack/svelte-query';
import { Keys } from '$lib/config';
import {
  clickPinnedPage,
  type ClickPinnedPageData,
  getPinnedPages,
  type PinnedPages,
  pinPage,
  unpinPage
} from '$lib/db';

export const usePinnedPages = () => {
  const client = getSupabaseClient();

  return createQuery({
    queryFn: () => getPinnedPages(client),
    queryKey: Keys.PINNED_PAGES
  });
};

export const usePinPage = () => {
  const client = getSupabaseClient();
  const queryClient = useQueryClient();

  return createMutation({
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
};

export const useUnpinPage = () => {
  const client = getSupabaseClient();
  const queryClient = useQueryClient();

  return createMutation({
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
};

export const useClickPinnedPage = () => {
  const client = getSupabaseClient();
  const queryClient = useQueryClient();

  return createMutation({
    mutationFn: async ({ page, userId }: ClickPinnedPageData) =>
      await clickPinnedPage(client, { page, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: Keys.PINNED_PAGES });
    }
  });
};
