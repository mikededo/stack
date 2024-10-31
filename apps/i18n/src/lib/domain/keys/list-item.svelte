<script lang="ts">
    import { Chip, IconButton } from '@stack/ui';

    import type { Project, ProjectKey, ProjectKeys } from '$lib/db';

    import { Check, CircleX, Pencil, TriangleAlert } from 'lucide-svelte';

    import { pathTo } from '$lib/config';

    type Props = {
        description: ProjectKey['description'];
        key: ProjectKey['key_name'];
        languages: Project['languages'];
        projectId: ProjectKeys['id'];
        translations: ProjectKey['translations'];
    };
    const { description, key, languages, projectId, translations }: Props = $props();

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

<div class="flex items-center px-4 py-3 border-b border-surface-100 last:border-none min-w-full w-fit" role="row">
    <div class="flex flex-col gap-0.5 w-48 md:w-64 shrink-0" role="cell">
        <p class="uppercase">{key}</p>
        <p class="text-xs text-surface-600 line-clamp-1">{description}</p>
    </div>
    <div class="w-48 shrink-0" role="cell">
        <Chip class="flex gap-1 items-center px-2.5 w-fit" variant={status}>
            <Icon class="size-3" strokeWidth={2} />
            <span class="text-xs">{text}</span>
        </Chip>
    </div>
    {#each languages as { code, id }(code)}
        <div class="w-48" role="cell">
            {translations.find(({ language_id }) => language_id === id)?.value ?? '-'}
        </div>
    {/each}
    <div class="ml-auto shrink-0" role="cell">
        <IconButton
            color="muted"
            Icon={Pencil}
            size="small"
            {href}
        />
    </div>
</div>
