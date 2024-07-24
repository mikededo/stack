import type { Database, Result } from '@mstack/svelte-supabase';
import { withUnauthorizedRedirect } from '@mstack/svelte-supabase';

import type { SupabaseClient } from '@supabase/supabase-js';

type Client = SupabaseClient<Database>;

export const getBooksWithPagesQuery = (client: Client) =>
  client.schema('finances').from('book').select('*, page(*)');
export const getBooksWithPages = async (client: Client) =>
  (await withUnauthorizedRedirect(client, await getBooksWithPagesQuery(client))).data;
export type BooksWithPages = Result<typeof getBooksWithPagesQuery>;
export type BookWithPages = BooksWithPages[number];

// Mutations
export type NewPageData = { name: string; book: number };
export const createPage = async (client: Client, { name, book }: NewPageData) =>
  (
    await client
      .schema('finances')
      .from('page')
      .insert([{ book_id: book, name }])
      .select()
      .throwOnError()
  ).data;
