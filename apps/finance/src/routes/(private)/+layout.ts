import { getUserData } from '@mstack/svelte-supabase';

import { redirect } from '@sveltejs/kit';

import { Keys, pathTo } from '$lib/config';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent }) => {
  const { session, queryClient, supabase } = await parent();
  if (!session) {
    throw redirect(302, pathTo('signIn'));
  }

  const result = await queryClient.fetchQuery({
    queryKey: Keys.USER,
    queryFn: () => getUserData(supabase)
  });
  if (!result) {
    throw redirect(302, pathTo('signIn'));
  }

  return { session, user: result };
};
