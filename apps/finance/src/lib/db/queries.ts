import type { Database, Result } from '@mstack/svelte-supabase';
import { withUnauthorizedRedirect } from '@mstack/svelte-supabase';

import type { SupabaseClient } from '@supabase/supabase-js';

type Client = SupabaseClient<Database>;

export const getBooksWithPagesQuery = (client: Client) =>
  client.schema('finances').from('book').select('*, page(*)');
export const getBooksWithPages = async (client: Client) =>
  (await withUnauthorizedRedirect(client, await getBooksWithPagesQuery(client))).data;
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

export const getPageQuery = (client: Client, id: number) =>
  client
    .schema('finances')
    .from('page')
    .select('*, expenses:date_sorted_expenses(*, tags:tag(*)), book(*)')
    .eq('id', id)
    .limit(1)
    .single();
export const getPage = async (client: Client, id: number) =>
  (await withUnauthorizedRedirect(client, await getPageQuery(client, id))).data;
export type Page = Result<typeof getPageQuery>;

export const getBookTagsQuery = (client: Client, id: number) =>
  client.schema('finances').from('tag').select('*').eq('book_id', id);
export const getBookTags = async (client: Client, id: number) =>
  (await withUnauthorizedRedirect(client, await getBookTagsQuery(client, id))).data;
export type Tags = Result<typeof getBookTagsQuery>;

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

export type NewTagData = { book: number; name: string; color: string };
export const createTag = async (client: Client, { book, ...data }: NewTagData) =>
  (
    await client
      .schema('finances')
      .from('tag')
      .insert([{ book_id: book, ...data }])
      .select()
      .throwOnError()
  ).data;

export type DeleteTagData = { id: number };
export const deleteTag = async (client: Client, id: number) =>
  await client.schema('finances').from('tag').delete().eq('id', id).select().throwOnError();
