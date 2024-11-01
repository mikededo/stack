<script lang="ts">
    import { getSupabaseClient } from '@stack/supabase';
    import { TextIconButton } from '@stack/ui';

    import type { PageData } from './$types';

    import { createQuery } from '@tanstack/svelte-query';
    import { FilePenLine } from 'lucide-svelte';

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

<div class="flex flex-col gap-8">
    <div class="flex justify-between">
        {#if $query.isLoading}
            <div class="h-10 w-1/3 animate-pulse rounded bg-surface-100"></div>
        {:else if $query.data}
            <div class="flex justify-between w-full">
                <h2 class="text-4xl font-bold">{$query.data.name}</h2>
                <TextIconButton
                    color="muted"
                    href={pathTo('editor', { project: `${$query.data.id}` })}
                    Icon={FilePenLine}
                    label="Go to editor"
                />
            </div>
        {/if}
    </div>
    {#if $query.isLoading}
        <SkeletonKeyList />
    {:else if $query.data}
        <KeyList keys={$query.data.keys} languages={$query.data.languages} projectId={$query.data.id} />
    {/if}
</div>
