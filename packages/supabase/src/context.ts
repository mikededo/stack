import type { SupabaseClient } from '@supabase/supabase-js';

import type { User } from './auth.js';
import type { Database } from './database.js';

import { getContext, setContext } from 'svelte';

const CLIENT_CONTEXT_KEY = 'supabase:client';
const USER_CONTEXT_KEY = 'supabase:user';

type Client<S extends keyof Database = 'public'> = SupabaseClient<Database, S>;

export const setSupabaseClient = <Schema extends keyof Database = 'public'>(
  client: Client<Schema>
) => {
  setContext(CLIENT_CONTEXT_KEY, client);
};

export const getSupabaseClient = <
  Schema extends keyof Database = 'public'
>(): Client<Schema> => {
  const context = getContext<Client<Schema>>(CLIENT_CONTEXT_KEY);
  if (!context) {
    throw new Error(
      'Unable to find Subapabase client on the tree. Make sure to use `setClient` on the root component.'
    );
  }

  return context;
};

export const setUserDataContext = async (user: User) => {
  setContext(USER_CONTEXT_KEY, user);
};

export const getUserDataContext = (): User => {
  const context = getContext<User>(USER_CONTEXT_KEY);
  if (!context) {
    throw new Error(
      'Unable to find user session on the tree. Make sure to use `setUserSession` on the root component.'
    );
  }

  return context;
};

