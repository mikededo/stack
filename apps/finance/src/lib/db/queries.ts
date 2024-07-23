import { type Database, type Result, withUnauthorizedRedirect } from '@mstack/svelte-supabase';

import type { SupabaseClient } from '@supabase/supabase-js';

type Client = SupabaseClient<Database>;

export const getBooksWithPagesQuery = (client: Client) =>
  client.schema('finances').from('book').select('*, page(*)');
export const getBooksWithPages = async (client: Client) =>
  (await withUnauthorizedRedirect(client, await getBooksWithPagesQuery(client))).data;
export type BooksWithPages = Result<typeof getBooksWithPagesQuery>;
export type BookWithPages = BooksWithPages[number];
