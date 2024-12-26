<script lang="ts">
    import type { Crumbs } from '@stack/ui';

    import type { Snippet } from 'svelte';

    import { Container } from '@stack/layouts';
    import { Breadcrumbs } from '@stack/ui';

    import type { LayoutData } from './$types';

    import { error } from '@sveltejs/kit';
    import { createQuery } from '@tanstack/svelte-query';

    import { page } from '$app/stores';
    import { Keys, pathTo } from '$lib/config';
    import { getProject } from '$lib/db';

    type Props = { children: Snippet; data: LayoutData };
    const { children, data }: Props = $props();

    const { supabase } = data;

    $effect(() => {
        if (Number.isNaN(+data.id)) {
            error(404, 'Project not found');
        }
    });

    const query = createQuery({
        enabled: !Number.isNaN(+data.id),
        queryFn: () => getProject(supabase, +data.id),
        queryKey: Keys.PROJECT(data.id)
    });
    const breadcrumbs = $derived.by<Crumbs>(() => {
        const { pathname } = $page.url;
        const base: Crumbs = [{ href: pathTo('app'), label: 'Projects' }];
        if (!$query.data) {
            return base;
        }

        if (pathname.endsWith('/editor')) {
            base.push({ href: pathTo('project', { project: `${$query.data.id}` }), label: $query.data.name });
            base.push({ href: pathname, label: 'Editor' });
        } else {
            base.push({ label: $query.data.name });
        }

        return base;
    });

</script>

<svelte:head>
    {#if $query.data}
        <title>Project: {$query.data.name}</title>
        <meta content="Phrases for the {$query.data.name} project" name="description" />
    {:else if $query.isError}
        <title>An error ocurred!</title>
        <meta content="An error ocurred!" name="description" />
    {:else}
        <title>Loading...</title>
        <meta content="Loading your project..." name="description" />
    {/if}
</svelte:head>

<Container class="flex flex-col gap-3 pt-0">
    <Breadcrumbs {breadcrumbs} />
    {@render children()}
</Container>

<!-- <CreatePhraseDialog projectId={+slug} /> -->
<!-- <DeletePhraseDialog projectId={+slug} /> -->
