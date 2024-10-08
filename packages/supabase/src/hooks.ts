import type { SupabaseClient } from '@supabase/supabase-js';
import type { RequestEvent } from '@sveltejs/kit';

import type { Database } from './database';
import type { Client } from './types';

import { createServerClient } from '@supabase/ssr';

export const createSupabaseServerClient = (
  supabseUrl: string,
  supabaseAnonKey: string,
  event: RequestEvent
): Client =>
  createServerClient<Database>(supabseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, options, value }) => {
          event.cookies.set(name, value, { ...options, path: '/' });
        });
      }
    }
  });

export const getSession = async <Schema extends keyof Database>(
  supabase: SupabaseClient<Database, Schema>
) => {
  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (!session) {
    return { session: null, user: null };
  }

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();
  if (error) {
    // JWT validation has failed
    return { session: null, user: null };
  }

  return { session, user };
};
