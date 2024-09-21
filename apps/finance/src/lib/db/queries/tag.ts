import type { Client } from '@stack/supabase';

// Mutations

export type NewTagData = { book: number; color: string; name: string };
export const createTag = async (
  client: Client,
  { book, ...data }: NewTagData
) =>
  (
    await client
      .schema('finances')
      .from('tag')
      .insert([{ book_id: book, ...data }])
      .select()
      .throwOnError()
  ).data;
export type UpdateTagData = { color: string; id: number; name: string };
export const updateTag = async (
  client: Client,
  { id, ...data }: UpdateTagData
) =>
  (
    await client
      .schema('finances')
      .from('tag')
      .update(data)
      .eq('id', id)
      .select()
      .throwOnError()
  ).data;
export type DeleteTagData = { id: number };
export const deleteTag = async (client: Client, id: number) =>
  await client
    .schema('finances')
    .from('tag')
    .delete()
    .eq('id', id)
    .select()
    .throwOnError();
