import { createSupabaseServerClient, getSession } from '@stack/svelte-supabase';

import { type Handle, redirect } from '@sveltejs/kit';

import { dev } from '$app/environment';
import { pathTo } from '$lib/config';

// Since we are running the production build with bun, we have to use
// procees.env to get the env variables
const supabaseUrl = dev
  ? import.meta.env.STACK_DEV_SUPABASE_URL
  : process.env.STACK_PROD_SUPABASE_URL;
const supabaseAnonKey = dev
  ? import.meta.env.STACK_DEV_SUPABASE_ANON_KEY
  : process.env.STACK_PROD_SUPABASE_ANON_KEY;

export const handle: Handle = async ({ event, resolve }) => {
  console.log(process.env);
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      JSON.stringify({
        STACK_DEV_SUPABASE_ANON_KEY: import.meta.env.STACK_DEV_SUPABASE_ANON_KEY,
        STACK_DEV_SUPABASE_URL: import.meta.env.STACK_DEV_SUPABASE_URL,
        STACK_PROD_SUPABASE_ANON_KEY: process.env.STACK_PROD_SUPABASE_ANON_KEY,
        STACK_PROD_SUPABASE_URL: process.env.STACK_PROD_SUPABASE_URL
      })
    );
    throw new Error('Supabase URL or Anon Key not set. Check logs');
  }

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
