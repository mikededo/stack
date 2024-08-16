import { createSupabaseServerClient, getSession } from '@mstack/svelte-supabase';

import { type Handle, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';

import { pathTo } from '$lib/config';

const supabaseUrl = dev
  ? import.meta.env.MSTACK_DEV_SUPABASE_URL
  : import.meta.env.MSTACK_PROD_SUPABASE_URL;
const supabaseAnonKey = dev
  ? import.meta.env.MSTACK_DEV_SUPABASE_ANON_KEY
  : import.meta.env.MSTACK_PROD_SUPABASE_ANON_KEY;

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient(supabaseUrl, supabaseAnonKey, event);
  event.locals.safeGetSession = async () => getSession(event.locals.supabase);

  if (event.url.pathname === '/') {
    throw redirect(302, pathTo('app'));
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === 'x-supabase-api-version';
    }
  });
};
