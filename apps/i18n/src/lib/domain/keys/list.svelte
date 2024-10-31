<script lang="ts">
    import { Chip } from '@stack/ui';

    import type { Project, ProjectKeys } from '$lib/db';

    import { Earth } from 'lucide-svelte';

    import KeyListItem from './list-item.svelte';

    type Props = {
        keys: ProjectKeys['keys'];
        languages: Project['languages'];
        projectId: ProjectKeys['id'];
    };
    const { keys, languages, projectId }: Props = $props();
</script>

<div class="border rounded overflow-x-auto border-surface-100 text-sm" role="table">
    <div class="px-4 py-3 flex items-center border-b border-surface-100 bg-surface-50 w-fit min-w-full" role="row">
        <div class="w-48 md:w-64 shrink-0 font-semibold" role="cell">Key identifier</div>
        <div class="w-48 shrink-0" role="cell">
            <Chip variant="primary">Status</Chip>
        </div>
        {#each languages as { code, name }(code)}
            <div class="w-48 font-semibold items-center gap-2 flex" role="cell">
                <Earth class="size-4" />
                <p>{name}</p>
            </div>
        {/each}
        <div class="w-12 self-end shrink-0" role="cell"></div>
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
        <div>No keys found!</div>
    {/if}
</div>
