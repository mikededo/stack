import { createSupabaseServerClient, getSession } from '@mstack/svelte-supabase';

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient<{}>(
    import.meta.env.MSTACK_DEV_SUPABASE_URL,
    import.meta.env.MSTACK_DEV_SUPABASE_ANON_KEY,
    event
  );
  event.locals.safeGetSession = async () => getSession(event.locals.supabase);

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === 'x-supabase-api-version';
    }
  });
};
