<script lang="ts">
    import type { Action } from 'svelte/action';

    import type { Project, ProjectKeys } from '$lib/db';

    import ListHeader from './list-header.svelte';
    import KeyListItem from './list-item.svelte';

    const SCROLL_THRESHOLD = 12;

    type Props = {
        keys: ProjectKeys['keys'];
        languages: Project['languages'];
        projectId: ProjectKeys['id'];
    };
    const { keys, languages, projectId }: Props = $props();

    let scrolled = $state(true);

    const useContainer: Action = (node) => {
        node.addEventListener('scroll', () => {
            if (node.scrollLeft > SCROLL_THRESHOLD && !scrolled) {
                scrolled = true;
            } else if (node.scrollLeft <= SCROLL_THRESHOLD && scrolled) {
                scrolled = false;
            }
        });
    };
</script>

<div class="border rounded overflow-x-auto border-surface-100 text-sm" use:useContainer role="table">
    <ListHeader {languages} {projectId} />

    {#if keys.length}
        <div role="rowgroup">
            {#each keys as { description, key_name: key, translations } (key)}
                {@const props = { description, key, languages, projectId, scrolled, translations }}
                <KeyListItem {...props} />
            {/each}
        </div>
    {:else}
        <div class="flex flex-col w-full py-8 items-center justify-center">
            <h2 class="text-center text-lg">
                No keys found!
            </h2>
            <p>Try creating a new key!</p>
        </div>
    {/if}
</div>
