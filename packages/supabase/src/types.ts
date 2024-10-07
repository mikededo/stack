import type { QueryData, Session, SupabaseClient, User } from '@supabase/supabase-js';

import type { Database } from './database';

export type Client = SupabaseClient<Database>;
export type Result<T extends (...args: any) => any> = QueryData<ReturnType<T>>;

export type SupabaseLocals = {
  safeGetSession: () => Promise<{ session: null | Session; user: null | User }>;
  supabase: Client;
};

export type SupabasePageData = {
  session: null | Session;
  user: null | User;
};
