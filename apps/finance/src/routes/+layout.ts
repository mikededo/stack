import { createSupabaseClient } from '@stack/supabase';

import type { LayoutLoad } from './$types';

import { QueryClient } from '@tanstack/svelte-query';

import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';

export const load: LayoutLoad = async ({ data, depends, fetch }) => {
  depends('supabase:auth');

  const supabase = createSupabaseClient(fetch, data.cookies, env);
  if (!supabase) {
    throw new Error('Supabase client not set');
  }

  /**
   * It's fine to use `getSession` here, because on the client, `getSession` is
   * safe, and on the server, it reads `session` from the `LayoutData`, which
   * safely checked the session using `safeGetSession`.
   */ const {
    data: { session }
  } = await supabase.auth.getSession();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
        staleTime: 60 * 1000
      }
    }
  });

  return { queryClient, session, supabase, user: data.user };
};
