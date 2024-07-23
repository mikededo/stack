import { isBrowser } from '@supabase/ssr';
import type {
  PostgrestSingleResponse,
  QueryData,
  SupabaseClient
} from '@supabase/supabase-js';

import type { Database } from './database';

export type Client = SupabaseClient<Database>;
export type Result<T extends (...args: any) => any> = QueryData<ReturnType<T>>;

type UnauthorizedRedirectOptions = {
  onBrowserRedirect?: () => void;
  onServerRedirect?: () => void;
};

/**
 * Helper handler that checks for unauthorized responses and provides callbacks for redirecting the user.
 * Works for both browser and server.
 */
export const withUnauthorizedRedirect = async <T, S extends keyof Database>(
  client: SupabaseClient<Database, S>,
  response: PostgrestSingleResponse<T>,
  { onBrowserRedirect, onServerRedirect }: UnauthorizedRedirectOptions = {}
) => {
  if (response.error && response.status >= 400 && response.status < 500) {
    await client.auth.signOut();

    if (isBrowser()) {
      onBrowserRedirect?.();
    } else {
      onServerRedirect?.();
    }
  }
  return response;
};

export type SignInData = { email: string; password: string };
export type SignUpData = { firstName: string; lastName: string } & SignInData;
export const signInUser = async (
  client: Client,
  email: string,
  password: string
) => {
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password
  });
  if (error) {
    throw error;
  }

  return data;
};
export const signUpUser = async (
  client: Client,
  { email, password, ...rest }: SignUpData
) => await client.auth.signUp({ email, password, options: { data: rest } });

export const getUserDataQuery = (client: Client) =>
  client.schema('public').from('user_data').select('*').limit(1).single();
export const getUserData = async (
  client: Client,
  options: UnauthorizedRedirectOptions = {}
) =>
  (
    await withUnauthorizedRedirect(
      client,
      await getUserDataQuery(client),
      options
    )
  ).data;
export type User = Result<typeof getUserDataQuery>;
