import type { SupabaseLocals } from '@stack/supabase';

import { redirect } from '@sveltejs/kit';

export const requireAuth = async (locals: SupabaseLocals, redirectPath: string) => {
  const session = await locals.safeGetSession();
  if (!session) {
    redirect(302, redirectPath);
  }

  return { session };
};
