import type { PostgrestSingleResponse } from '@supabase/supabase-js';

import type { Client, Result } from './types.ts';

import { isBrowser } from '@supabase/ssr';

type UnauthorizedRedirectOptions = {
  onBrowserRedirect?: () => void;
  onServerRedirect?: () => void;
};

/**
 * Helper handler that checks for unauthorized responses and provides callbacks for redirecting the user.
 * Works for both browser and server.
 */
export const withUnauthorizedRedirect = async <T>(
  client: Client,
  response: PostgrestSingleResponse<T>,
  { onBrowserRedirect, onServerRedirect }: UnauthorizedRedirectOptions = {}
) => {
  // TODO: Specifically check for 401 and 403 errors
  if (response.error && response.status > 400 && response.status < 500) {
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
) => await client.auth.signUp({ email, options: { data: rest }, password });

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
