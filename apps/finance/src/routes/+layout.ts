import type { Database } from '@stack/svelte-supabase';

import type { LayoutLoad } from './$types';

import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
import { QueryClient } from '@tanstack/svelte-query';

import { browser } from '$app/environment';
import { getEnv } from '$lib/config';

export const load: LayoutLoad = async ({ data, depends, fetch }) => {
  depends('supabase:auth');

  const { supabaseAnonKey, supabaseUrl } = getEnv();
  let supabase;
  try {
    supabase = isBrowser()
      ? createBrowserClient<Database>(supabaseUrl, supabaseAnonKey, {
          global: { fetch }
        })
      : createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
          cookies: {
            getAll() {
              return data.cookies;
            }
          },
          global: { fetch }
        });
  } catch (e) {
    console.log('layout error', e);
  }

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
