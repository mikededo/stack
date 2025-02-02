import type { Client, Result } from '@stack/supabase';

import {

  withUnauthorizedRedirect
} from '@stack/supabase';

export const getLastAccessedPagesQuery = (client: Client) =>
  client
    .schema('finances')
    .from('last_accessed_pages')
    .select('*, page(*, book(name))')
    .order('last_accessed', { ascending: false });
export const getLastAccessedPages = async (client: Client) =>
  (
    await withUnauthorizedRedirect(
      client,
      await getLastAccessedPagesQuery(client)
    )
  ).data;
export type LastViewedPage = Result<typeof getLastAccessedPagesQuery>;

// Mutations
export const trackPageView = async (client: Client, page: number) =>
  await client
    .schema('finances')
    .rpc('log_last_accessed_page', { page })
    .throwOnError();
