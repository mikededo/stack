import { createServerClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { RequestEvent } from '@sveltejs/kit';

export const createSupabaseServerClient = <Database>(
  supabseUrl: string,
  supabaseAnonKey: string,
  event: RequestEvent
) =>
  createServerClient<Database>(supabseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' });
        });
      }
    }
  });

export const getSession = async (supabase: SupabaseClient) => {
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
