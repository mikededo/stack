import type { QueryData, SupabaseClient } from '@supabase/supabase-js';

import type { Database } from './database';

export type Client = SupabaseClient<Database>;
export type Result<T extends (...args: any) => any> = QueryData<ReturnType<T>>;
