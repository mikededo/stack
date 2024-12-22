<script lang="ts">
    import type { PageData } from './$types';

    import { getSupabaseClient } from '@stack/supabase';
    import { IconButton, TextIconButton } from '@stack/ui';
    import { createQuery } from '@tanstack/svelte-query';
    import { gotoWithParams, Keys, pathTo } from '$lib/config';
    import { getProject } from '$lib/db';
    import { CreateKeyDialog, KeyList, SkeletonKeyList } from '$lib/domain/keys';
    import { FilePenLine, FilePlus, Settings } from 'lucide-svelte';

    type Props = { data: PageData };
    const { data }: Props = $props();

    const supabaseClient = getSupabaseClient();

    const query = createQuery({
        queryFn: () => getProject(supabaseClient, +data.id),
        queryKey: Keys.PROJECT(data.id)
    });

    const onAddKey = () => {
        gotoWithParams({ dialog: 'create-key' });
    };
</script>

<div class="flex flex-col gap-8">
    <div class="flex justify-between">
        {#if $query.isLoading}
            <div class="h-10 w-1/3 animate-pulse rounded bg-surface-100"></div>
        {:else if $query.data}
            <div class="flex justify-between w-full">
                <h2 class="text-4xl font-bold">{$query.data.name}</h2>
                <div class="flex items-center gap-1">
                    <TextIconButton
                        color="primary"
                        disabled={$query.isLoading}
                        Icon={FilePlus}
                        label="Add key"
                        onclick={onAddKey}
                    />
                    <TextIconButton
                        color="muted"
                        href={pathTo('editor', { project: `${$query.data.id}` })}
                        Icon={FilePenLine}
                        label="Go to editor"
                    />
                    <IconButton color="muted" Icon={Settings} iconClasses="size-4" />
                </div>
            </div>
        {/if}
    </div>

    {#if $query.isLoading}
        <SkeletonKeyList />
    {:else if $query.data}
        <KeyList
            keys={$query.data.keys}
            languages={$query.data.languages}
            projectId={$query.data.id}
        />
    {/if}
</div>

<CreateKeyDialog project={+data.id} />
