import type { PageLoad } from './$types';

import { Keys } from '$lib/config';
import { getBook } from '$lib/db';

export const load: PageLoad = async ({ params, parent }) => {
  const { queryClient, supabase } = await parent();

  queryClient.prefetchQuery({
    queryFn: () => getBook(supabase, +params.book),
    queryKey: Keys.BOOK(params.book)
  });

  return { params };
};
