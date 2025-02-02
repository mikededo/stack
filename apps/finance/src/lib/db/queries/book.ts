import type { Client, Result } from '@stack/supabase';

import {

  withUnauthorizedRedirect
} from '@stack/supabase';

export const getBooksWithPagesQuery = (client: Client) =>
  client.schema('finances').from('book').select('*, page(*)');
export const getBooksWithPages = async (client: Client) =>
  (await withUnauthorizedRedirect(client, await getBooksWithPagesQuery(client)))
    .data;
export type BooksWithPages = Result<typeof getBooksWithPagesQuery>;

export const getBookQuery = (client: Client, id: number) =>
  client
    .schema('finances')
    .from('book')
    .select('*, page(*), tag(*)')
    .eq('id', id)
    .limit(1)
    .single();
export const getBook = async (client: Client, id: number) =>
  (await withUnauthorizedRedirect(client, await getBookQuery(client, id))).data;
export type Book = Result<typeof getBookQuery>;
export type Tag = Book['tag'][number];

// Mutations
export const createBook = async (client: Client, name: string) =>
  (
    await client
      .schema('finances')
      .from('book')
      .insert([{ name }])
      .select()
      .throwOnError()
  ).data;
