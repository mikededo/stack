import type { Client } from '@stack/supabase';

import type { Project } from './projects';

export type CreateKeyData = { key: string; project: Project['id'] };
export const createKey = async (client: Client, { key, project }: CreateKeyData) =>
  (
    await client.schema('i18n')
      .from('keys')
      .insert([{ key_name: key, project_id: project }])
      .select()
      .throwOnError()
  ).data;
