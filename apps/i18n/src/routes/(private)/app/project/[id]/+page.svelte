<script lang="ts">
    import { Container } from '@stack/layouts';
    import { getSupabaseClient } from '@stack/supabase';

    import type { PageData } from './$types';

    import { createQuery } from '@tanstack/svelte-query';
    import { MoveLeftIcon } from 'lucide-svelte';

    import { Keys, pathTo } from '$lib/config';
    import { getProject } from '$lib/db';
    import { KeyList, SkeletonKeyList } from '$lib/domain/keys';

    type Props = { data: PageData };
    const { data }: Props = $props();

    const supabaseClient = getSupabaseClient();

    const query = createQuery({
        queryFn: async () => await getProject(supabaseClient, +data.id),
        queryKey: Keys.PROJECT(data.id)
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
    <div class="flex justify-between gap-4">
        <a
            class="flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-sm font-semibold transition-colors hover:bg-surface-50"
            href={pathTo('app')}
        >
            <MoveLeftIcon class="size-4" strokeWidth={2} />
            <span>Projects</span>
        </a>
        <!-- <Breadcrumbs /> -->
    </div>
    <div class="flex flex-col gap-8">
        <div class="flex justify-between">
            {#if $query.isLoading}
                <div class="h-10 w-1/3 animate-pulse rounded bg-surface-100"></div>
            {:else if $query.data}
                <h2 class="text-4xl font-bold">{$query.data.name}</h2>
                <div class="flex items-center gap-2">
                </div>
            {/if}
        </div>
        {#if $query.isLoading}
            <SkeletonKeyList />
        {:else if $query.data}
            <KeyList keys={$query.data.keys} languages={$query.data.languages} projectId={$query.data.id} />
        {/if}
    </div>
</Container>
