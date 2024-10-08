import type { Client, Result } from '@stack/supabase';

import { withUnauthorizedRedirect } from '@stack/supabase';

export const getBookTagsQuery = (client: Client, id: number) =>
  client.schema('finances').from('tag').select('*').eq('book_id', id);
export const getBookTags = async (client: Client, id: number) =>
  (await withUnauthorizedRedirect(client, await getBookTagsQuery(client, id)))
    .data;
export type Tags = Result<typeof getBookTagsQuery>;
