import { Keys } from '$lib/config';
import { getPage } from '$lib/db';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
  const { queryClient, supabase } = await parent();

  queryClient.prefetchQuery({
    queryKey: Keys.BOOK(params.page),
    queryFn: () => getPage(supabase, params.page)
  });

  return { params };
};
