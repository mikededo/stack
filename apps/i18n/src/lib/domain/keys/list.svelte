<script lang="ts">
    import { Chip } from '@stack/ui';

    import type { Project, ProjectKeys } from '$lib/db';

    import { Earth } from 'lucide-svelte';

    import ListItemCell from './list-item-cell.svelte';
    import KeyListItem from './list-item.svelte';

    type Props = {
        keys: ProjectKeys['keys'];
        languages: Project['languages'];
        projectId: ProjectKeys['id'];
    };
    const { keys, languages, projectId }: Props = $props();
</script>

<div class="border rounded overflow-x-auto border-surface-100 text-sm" role="table">
    <div class="relative flex items-center border-b border-surface-100 bg-surface-50 min-w-fit" role="row">
        <ListItemCell header sticky>Key identifier</ListItemCell>
        <ListItemCell header>
            <Chip variant="primary">Status</Chip>
        </ListItemCell>
        {#each languages as { code, name }(code)}
            <ListItemCell class="flex gap-2 items-center" header>
                <Earth class="size-4" />
                <p>{name}</p>
            </ListItemCell>
        {/each}
    </div>

    {#if keys.length}
        <div role="rowgroup">
            {#each keys as { description, key_name: key, translations } (key)}
                {#if key}
                    <KeyListItem
                        {description}
                        {key}
                        {languages}
                        {projectId}
                        {translations}
                    />
                {/if}
            {/each}
        </div>
    {:else}
        <div
            class="flex flex-col w-full py-8 items-center justify-center"
        >
            <h2 class="text-center text-lg ">
                No keys found!
            </h2>
            <p>Try creating a new key!</p>
        </div>
    {/if}
</div>
