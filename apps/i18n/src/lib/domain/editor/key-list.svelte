<script lang="ts">
    import { Input } from '@stack/ui';

    import type { ProjectKeys } from '$lib/db';

    import KeyListItem from './key-list-item.svelte';

    type Props = { project: ProjectKeys };
    const { project }: Props = $props();
</script>

<aside class="col-span-1 border border-surface-100 rounded-lg min-h-[960px]">
    <div class="w-full flex flex-col gap-1 border-b border-surface-100 py-3 px-3">
        <Input placeholder="Search keys" />
    </div>
    <ul class="flex flex-col gap-[1px]">
        {#each project.keys as key (key.id)}
            <KeyListItem {key} />
        {/each}
    </ul>
</aside>
