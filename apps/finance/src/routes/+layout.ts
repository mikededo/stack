import type { Database } from '@stack/svelte-supabase';

import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
import { QueryClient } from '@tanstack/svelte-query';

import { browser, dev } from '$app/environment';

import type { LayoutLoad } from './$types';

const supabaseUrl = dev
  ? import.meta.env.STACK_DEV_SUPABASE_URL
  : import.meta.env.STACK_PROD_SUPABASE_URL;
const supabaseAnonKey = dev
  ? import.meta.env.STACK_DEV_SUPABASE_ANON_KEY
  : import.meta.env.STACK_PROD_SUPABASE_ANON_KEY;

export const load: LayoutLoad = async ({ data, depends, fetch }) => {
  depends('supabase:auth');

  const supabase = isBrowser()
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
