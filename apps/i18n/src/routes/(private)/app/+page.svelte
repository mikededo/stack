<script lang="ts">
    import { Container } from '@stack/layouts';

    import type { PageData } from './$types';

    import { createQuery } from '@tanstack/svelte-query';

    import { Keys } from '$lib/config';
    import { getProjects } from '$lib/db';
    import {
        ProjectCard,
        ProjectGrid
    } from '$lib/domain/projects';

    export let data: PageData;
    const { supabase } = data;

    const projectsQuery = createQuery({
        queryFn: () => getProjects(supabase),
        queryKey: Keys.PROJECTS
    });
// const languagesQuery = createQuery({
    //     queryFn: () => getAvailableLanguages(supabaseClient),
    //     queryKey: Keys.LANGUAGES
    // });

    // const handleOnPrefetch = (id: ProjectWithLanguages['id']) => {
    //     queryClient.prefetchQuery({
    //         queryFn: async () => await getProject(supabaseClient, id),
    //         queryKey: Keys.PROJECT(`${id}`)
    //     });
    // };
</script>

<svelte:head>
    <title>Projects | Lang Hub</title>
    <meta content="Welcome to Lang Hub!" name="description" />
    <meta content="#ffffff" name="theme-color" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta content="Lang Hub" name="apple-mobile-web-app-title" />
    <meta content="Lang Hub" name="application-name" />
    <meta content="Projects | Lang Hub" property="og:title" />
    <meta content="Welcome to Lang Hub!" property="og:description" />
</svelte:head>

<Container class="h-full w-full">
    {#if $projectsQuery.isLoading}
        <ProjectGrid>
            <div></div>
            <!-- <ProjectSkeleton /> -->
            <!-- <ProjectSkeleton /> -->
            <!-- <ProjectSkeleton /> -->
            <!-- <ProjectSkeleton /> -->
            <!-- <ProjectSkeleton /> -->
        </ProjectGrid>
    {:else if !$projectsQuery.data}
        <div>Empty state</div>
    {:else}
        <ProjectGrid>
            {#each $projectsQuery.data as project (project.id)}
                <ProjectCard {project} />
            {/each}
            <!-- <CreateProjectCard /> -->
        </ProjectGrid>
    {/if}
</Container>
<!-- <CreateProjectDialog languages={$languagesQuery.data} loading={$languagesQuery.isLoading} /> -->
