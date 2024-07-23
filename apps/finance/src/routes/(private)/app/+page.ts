import { Keys } from '$lib/config';
import { getBooksWithPages } from '$lib/db';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
  const { queryClient, supabase } = await parent();

  queryClient.prefetchQuery({
    queryKey: Keys.BOOKS,
    queryFn: () => getBooksWithPages(supabase)
  });
};
