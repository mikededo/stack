import { getSupabaseClient } from '@stack/svelte-supabase';

import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';

import { Keys } from '$lib/config';
import { getLastAccessedPages, trackPageView } from '$lib/db';

/**
 * This includes hooks that are re-used at the app level. In order to keep things more
 * scoped and organised, try to keep specific hooks in the domain
 */

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
