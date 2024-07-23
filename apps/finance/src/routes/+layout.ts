import type { Database } from '@mstack/svelte-supabase';

import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
import { QueryClient } from '@tanstack/svelte-query';

import { browser, dev } from '$app/environment';

import type { LayoutLoad } from './$types';

// TBD
const supabaseURl = dev ? import.meta.env.MSTACK_DEV_SUPABASE_URL : '';
const supabaseAnonKey = dev ? import.meta.env.MSTACK_DEV_SUPABASE_ANON_KEY : '';

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
  depends('supabase:auth');

  const supabase = isBrowser()
    ? createBrowserClient<Database>(supabaseURl, supabaseAnonKey, {
        global: { fetch }
      })
    : createServerClient<Database>(supabaseURl, supabaseAnonKey, {
        global: { fetch },
        cookies: {
          getAll() {
            return data.cookies;
          }
        }
      });

  const {
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

  return { supabase, session, user: data.user, queryClient };
};
