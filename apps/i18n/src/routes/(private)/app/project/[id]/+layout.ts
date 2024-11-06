import type { LayoutLoad } from './$types';

import { Keys } from '$lib/config';
import { getProject } from '$lib/db';

export const load: LayoutLoad = async ({ params, parent }) => {
  const { id } = params;
  const { queryClient, supabase } = await parent();

  queryClient.prefetchQuery({
    queryFn: () => getProject(supabase, +id),
    queryKey: Keys.PROJECT(id)
  });

  return ({ id });
};
