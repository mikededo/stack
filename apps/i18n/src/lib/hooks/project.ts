import { getSupabaseClient } from '@stack/supabase';

import { createQuery } from '@tanstack/svelte-query';

import { Keys } from '$lib/config';
import { getProject } from '$lib/db';

export const useProject = (id: number) => {
  const supabase = getSupabaseClient();

  return createQuery({
    queryFn: () => getProject(supabase, id),
    queryKey: Keys.PROJECT(`${id}`)
  });
};
