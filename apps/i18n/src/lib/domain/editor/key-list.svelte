<script lang="ts">
    import { Input } from '@stack/ui';
    import { useProject } from '$lib/hooks';

    import KeyListItem from './key-list-item.svelte';

    type Props = { project: number };
    const { project }: Props = $props();

    const projectQuery = useProject(project);
</script>

<aside class="col-span-1 border border-surface-100 rounded-lg min-h-[960px]">
    <div class="w-full flex flex-col gap-1 border-b border-surface-100 py-3 px-3">
        <Input disabled={$projectQuery.isLoading} placeholder="Search keys" />
    </div>
    {#if $projectQuery.data}
        <ul class="flex flex-col">
            {#each $projectQuery.data.keys as key (key.id)}
                <KeyListItem {key} />
            {/each}
        </ul>
    {/if}
</aside>
