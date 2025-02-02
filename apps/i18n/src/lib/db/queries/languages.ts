import type { Client, Result } from '@stack/supabase';

import { withUnauthorizedRedirect } from '@stack/supabase';

const getAvailableLanguagesQuery = (client: Client) => client
  .schema('i18n')
  .from('languages')
  .select('*')
  .order('name', { ascending: true });
export const getAvailableLanguages = async (client: Client) =>
  (await withUnauthorizedRedirect(client, await getAvailableLanguagesQuery(client))).data;
export type Languages = Result<typeof getAvailableLanguagesQuery>;
export type Language = Languages[number];
