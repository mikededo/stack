import type { PageLoad } from './$types';

import { Keys } from '$lib/config';
import { getAvailableLanguages, getProjects } from '$lib/db';

export const load: PageLoad = async ({ parent }) => {
  const { queryClient, supabase } = await parent();

  // Should only be fetched once as the data is static
  queryClient.prefetchQuery({
    queryFn: () => getAvailableLanguages(supabase),
    queryKey: Keys.LANGUAGES,
    staleTime: Infinity
  });

  queryClient.prefetchQuery({
    queryFn: () => getProjects(supabase),
    queryKey: Keys.PROJECTS
  });
};
