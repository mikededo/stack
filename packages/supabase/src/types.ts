import type { QueryData, Session, SupabaseClient, User } from '@supabase/supabase-js';

import type { Database } from './database.js';

type Schema = keyof Database;
type SchemaFunctions<S extends Schema> = keyof Database[S]['Functions'];

export type Client = SupabaseClient<Database>;
export type Result<T extends (...args: any) => any> = QueryData<ReturnType<T>>;

export type FunctionArgs<
  S extends Schema = 'public',
  F extends SchemaFunctions<S> = never
> = F extends never ? never :
'Args' extends keyof Database[S]['Functions'][F] ? Database[S]['Functions'][F]['Args'] : never;

export type SupabaseLocals = {
  supabase: Client;
  safeGetSession: () => Promise<{ user: null | User; session: null | Session }>;
};

export type SupabasePageData = {
  user: null | User;
  session: null | Session;
};
