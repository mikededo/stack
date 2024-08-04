import { Keys } from '$lib/config';
import { getBook } from '$lib/db';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
  const { queryClient, supabase } = await parent();

  queryClient.prefetchQuery({
    queryKey: Keys.BOOK(params.book),
    queryFn: () => getBook(supabase, +params.book)
  });

  return { params };
};
