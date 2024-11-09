<script lang="ts">
    import type { Project, ProjectKey, ProjectKeys } from '$lib/db';

    import { pathTo } from '$lib/config';

    import KeyStatusChip from './key-status-chip.svelte';
    import ListItemCell from './list-item-cell.svelte';

    type Props = {
        description: ProjectKey['description'];
        key: ProjectKey['key_name'];
        languages: Project['languages'];
        projectId: ProjectKeys['id'];
        translations: ProjectKey['translations'];
        scrolled?: boolean;
    };
    const { description, key, languages, projectId, scrolled, translations }: Props = $props();

    const classes = $derived(`border-r border-transparent ${scrolled ? 'border-surface-100' : ''}`);

    const href = $derived(pathTo('editor', { project: `${projectId}` }, { keyId: key }));
</script>

<div class="flex relative items-center border-b border-surface-100 last:border-none min-w-fit" role="row">
    <ListItemCell class={classes} sticky>
        <a class="uppercase hover:underline hover:underline-offset-2" {href}>{key}</a>
        <p class="text-xs text-surface-600 line-clamp-1">{description}</p>
    </ListItemCell>
    <ListItemCell>
        <KeyStatusChip count={translations.length} max={languages.length} />
    </ListItemCell>
    {#each languages as { code, id }(code)}
        <ListItemCell>
            {translations.find(({ language_id }) => language_id === id)?.value ?? '-'}
        </ListItemCell>
    {/each}
</div>
