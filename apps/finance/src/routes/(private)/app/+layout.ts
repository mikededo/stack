import { getUserData } from '@stack/svelte-supabase';

import { redirect } from '@sveltejs/kit';

import { Keys, pathTo } from '$lib/config';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent, url }) => {
  const { queryClient, session, supabase } = await parent();
  if (!session) {
    throw redirect(302, pathTo('signIn'));
  }

  const result = await queryClient.fetchQuery({
    queryFn: () => getUserData(supabase),
    queryKey: Keys.USER
  });
  if (!result) {
    throw redirect(307, pathTo('signIn'));
  }

  return { pathname: url.pathname, session, user: result };
};
