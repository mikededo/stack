import { Keys } from '$lib/config';
import { getBudgetPlans, getBudgetPresets } from '$lib/db/queries';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
  const { queryClient, supabase } = await parent();

  queryClient.prefetchQuery({
    queryFn: () => getBudgetPresets(supabase),
    queryKey: Keys.BUDGET_PRESETS
  });
  queryClient.prefetchQuery({
    queryFn: () => getBudgetPlans(supabase),
    queryKey: Keys.BUDGET_PLANS
  });

  return { params: { book: 'budget' } };
};
