import { Keys } from '$lib/config';
import { getBookTags } from '$lib/db';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params, parent }) => {
  const { book } = params;
  const { supabase, queryClient } = await parent();

  // Prefetch them for all nested book routes
  queryClient.prefetchQuery({
    queryKey: Keys.BOOK_TAGS(book),
    queryFn: () => getBookTags(supabase, +book)
  });
};
