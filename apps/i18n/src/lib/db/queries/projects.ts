import { type Client, type Result, withUnauthorizedRedirect } from '@stack/supabase';

const getProjectsQuery = (client: Client) => client.schema('i18n')
  .from('projects')
  .select('*, languages:project_languages(...languages(*))');
export const getProjects = async (client: Client) =>
  (await withUnauthorizedRedirect(client, await getProjectsQuery(client)))
    .data;
export type Projects = Result<typeof getProjectsQuery>;
export type Project = Projects[number];
