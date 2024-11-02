<script lang="ts">
    import { Chip } from '@stack/ui';

    import type { Project, ProjectKeys } from '$lib/db';

    import { Earth } from 'lucide-svelte';

    import ListItemCell from './list-item-cell.svelte';

    type Props = {
        languages: Project['languages'];
        projectId: ProjectKeys['id'];
    };
    const { languages }: Props = $props();
</script>

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
