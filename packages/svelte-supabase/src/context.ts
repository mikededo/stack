import type { SupabaseClient } from '@supabase/supabase-js';
import { getContext, setContext } from 'svelte';

import type { Database } from './database';

const CONTEXT_KEY = 'supabase:client';

type Client<S extends keyof Database = 'public'> = SupabaseClient<Database, S>;

export const setSupabaseClient = <Schema extends keyof Database = 'public'>(
  client: Client<Schema>
) => {
  setContext(CONTEXT_KEY, client);
};

export const getSupabaseClient = <
  Schema extends keyof Database = 'public'
>(): Client<Schema> => {
  const context = getContext<Client<Schema>>(CONTEXT_KEY);
  if (!context) {
    throw new Error(
      'Unable to find Subapabase client on the tree. Make sure to use `setClient` on the root component.'
    );
  }

  return context;
};
