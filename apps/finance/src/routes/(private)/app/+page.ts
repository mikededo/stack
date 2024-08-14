import { Keys } from '$lib/config';
import { getBooksWithPages, getLastAccessedPages, getPinnedPages } from '$lib/db';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
  const { queryClient, supabase } = await parent();

  queryClient.prefetchQuery({
    queryFn: () => getBooksWithPages(supabase),
    queryKey: Keys.BOOKS
  });
  queryClient.prefetchQuery({
    queryFn: () => getPinnedPages(supabase),
    queryKey: Keys.PINNED_PAGES
  });
  queryClient.prefetchQuery({
    queryFn: () => getLastAccessedPages(supabase),
    queryKey: Keys.LAST_VIEWED_PAGES
  });
};
