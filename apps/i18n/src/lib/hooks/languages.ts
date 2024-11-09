import { getSupabaseClient } from '@stack/supabase';

import { createQuery } from '@tanstack/svelte-query';

import { Keys } from '$lib/config';
import { getAvailableLanguages } from '$lib/db';

export const useLanguages = () => {
  const supabase = getSupabaseClient();
  return createQuery({
    queryFn: () => getAvailableLanguages(supabase),
    queryKey: Keys.LANGUAGES,
    staleTime: Infinity
  });
};
