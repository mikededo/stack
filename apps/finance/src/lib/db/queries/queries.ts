import type { Client, Result } from '@stack/supabase';

import { withUnauthorizedRedirect } from '@stack/supabase';

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
export type Expense = Page['expenses'][number];

export const getPinnedPagesQuery = (client: Client) =>
  client
    .schema('finances')
    .from('pinned_pages')
    .select('page(*)')
    .order('last_clicked', { ascending: false });
export const getPinnedPages = async (client: Client) =>
  (await withUnauthorizedRedirect(client, await getPinnedPagesQuery(client)))
    .data;
export type PinnedPages = Result<typeof getPinnedPagesQuery>;
export type PinnedPage = PinnedPages[number]['page'];

// Mutations
export type NewPageData = { name: string; book: number };
export const createPage = async (client: Client, { book, name }: NewPageData) =>
  (
    await client
      .schema('finances')
      .from('page')
      .insert([{ book_id: book, name }])
      .select()
      .throwOnError()
  ).data;

export const pinPage = async (client: Client, page: number) =>
  (
    await client
      .schema('finances')
      .from('pinned_pages')
      .insert([{ page_id: page }])
      .select('page(*)')
      .throwOnError()
  ).data;
export const unpinPage = async (client: Client, page: number) =>
  await client
    .schema('finances')
    .from('pinned_pages')
    .delete()
    .eq('page_id', page)
    .throwOnError();
export type ClickPinnedPageData = { page: number; userId: string };
export const clickPinnedPage = async (
  client: Client,
  { page, userId }: ClickPinnedPageData
) =>
  await client
    .schema('finances')
    .from('pinned_pages')
    .update({ last_clicked: new Date().toISOString() })
    .eq('page_id', page)
    .eq('user_id', userId);
