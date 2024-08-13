import { getSupabaseClient } from '@mstack/svelte-supabase';

import { useQueryClient } from '@tanstack/svelte-query';

import { usePinnedPages as usePinnedPagesQuery, usePinPage, useUnpinPage } from '$lib/hooks';

export const usePinnedPages = () => {
  const queryClient = useQueryClient();
  const supabase = getSupabaseClient();

  const query = usePinnedPagesQuery(supabase);
  const pin = usePinPage(supabase, queryClient);
  const unpin = useUnpinPage(supabase, queryClient);

  return { pin, query, unpin };
};
