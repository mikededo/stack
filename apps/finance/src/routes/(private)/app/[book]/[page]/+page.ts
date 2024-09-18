import type { PageLoad } from './$types';

import { Keys } from '$lib/config';
import { getPage } from '$lib/db';

export const load: PageLoad = async ({ params, parent }) => {
  const { queryClient, supabase } = await parent();

  queryClient.prefetchQuery({
    queryFn: () => getPage(supabase, +params.page),
    queryKey: Keys.PAGE(params.book, params.page)
  });

  return { params };
};
