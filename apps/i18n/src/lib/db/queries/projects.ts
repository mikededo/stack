import type { CamelCaseProperties } from '@stack/utils';

import { type Client, type FunctionArgs, type Result, withUnauthorizedRedirect } from '@stack/supabase';

const getProjectsQuery = (client: Client) => client.schema('i18n')
  .from('projects')
  .select('*, languages:project_languages(is_default, ...languages(*))');
export const getProjects = async (client: Client) =>
  (await withUnauthorizedRedirect(client, await getProjectsQuery(client)))
    .data;
export type Projects = Result<typeof getProjectsQuery>;
export type Project = Projects[number];

export type CreateProjectData = CamelCaseProperties<FunctionArgs<'i18n', 'create_project'>, 'p_'>;
export const createProject = async (
  client: Client,
  data: CreateProjectData
) =>
  (
    await client.schema('i18n').rpc('create_project', {
      p_default_language_id: data.defaultLanguageId,
      p_description: data.description,
      p_language_ids: data.languageIds,
      p_name: data.name,
      p_website_url: data.websiteUrl
    }).throwOnError()
  ).data;

export const getProjectWithPhrases = (client: Client, id: number) =>
  client
    .schema('i18n')
    .from('projects')
    .select(
      '*, keys(*, translations(*)), languages:project_languages(is_default, ...languages(*))'
    )
    .eq('id', id)
    .single();
export const getProject = async (client: Client, id: number) =>
  (await withUnauthorizedRedirect(client, await getProjectWithPhrases(client, id))).data;
export type ProjectKeys = Result<typeof getProjectWithPhrases>;
export type ProjectKey = ProjectKeys['keys'][number];

