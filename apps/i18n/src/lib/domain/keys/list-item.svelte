<script lang="ts">
    import { Chip } from '@stack/ui';

    import type { Project, ProjectKey, ProjectKeys } from '$lib/db';

    import { Check, CircleX, TriangleAlert } from 'lucide-svelte';

    import { pathTo } from '$lib/config';

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

    const [status, Icon, text] = $derived.by(() => {
        const translated = translations.length;
        if (!translated) {
            return ['destructive' as const, CircleX, 'Not started'];
        }

        return translated < languages.length
            ? ['warning' as const, TriangleAlert, 'Incomplete']
            : ['positive' as const, Check, 'Completed'];
    });
    const href = $derived(pathTo('editor', { project: `${projectId}` }));
</script>

<div class="flex relative items-center border-b border-surface-100 last:border-none min-w-fit" role="row">
    <ListItemCell class={classes} sticky>
        <a class="uppercase hover:underline hover:underline-offset-2" {href}>{key}</a>
        <p class="text-xs text-surface-600 line-clamp-1">{description}</p>
    </ListItemCell>
    <ListItemCell>
        <Chip class="flex gap-1 items-center px-2.5 w-fit" variant={status}>
            <Icon class="size-3" strokeWidth={2} />
            <span class="text-xs">{text}</span>
        </Chip>
    </ListItemCell>
    {#each languages as { code, id }(code)}
        <ListItemCell>
            {translations.find(({ language_id }) => language_id === id)?.value ?? '-'}
        </ListItemCell>
    {/each}
</div>
