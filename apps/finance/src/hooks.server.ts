import { createSupabaseServerClient, getSession } from '@stack/svelte-supabase';

import { type Handle, redirect } from '@sveltejs/kit';

import { getEnv, pathTo } from '$lib/config';

// Since we are running the production build with bun, we have to use
// procees.env to get the env variables

export const handle: Handle = async ({ event, resolve }) => {
  const { supabaseAnonKey, supabaseUrl } = getEnv();

  try {
    event.locals.supabase = createSupabaseServerClient(supabaseUrl, supabaseAnonKey, event);
    event.locals.safeGetSession = async () => getSession(event.locals.supabase);
  } catch (e) {
    console.log('hooks error', e);
  }

  if (event.url.pathname === '/') {
    throw redirect(302, pathTo('app'));
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === 'x-supabase-api-version';
    }
  });
};

export const handleError = (e) => console.log(e);
