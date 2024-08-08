import { Keys } from '$lib/config';
import { getBookTags } from '$lib/db';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params, parent }) => {
  const { book } = params;
  const { queryClient, supabase } = await parent();

  // Prefetch them for all nested book routes
  queryClient.prefetchQuery({
    queryFn: () => getBookTags(supabase, +book),
    queryKey: Keys.BOOK_TAGS(book)
  });
};
