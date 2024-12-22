<script lang="ts">
    import type { Snippet } from 'svelte';

    import { Input } from '@stack/ui';
    import { fade } from 'svelte/transition';

    import { getListContext } from './context.svelte';

    type Props = { children: Snippet };
    const { children }: Props = $props();

    const listState = getListContext();
</script>

<div class="flex flex-row items-center justify-end gap-2">
    {#if listState.view === 'pages'}
        <div class="mr-auto w-full" transition:fade={{ duration: 150 }}>
            <Input
                class="w-full max-w-96 text-sm"
                bind:value={listState.keywords}
                color="surface"
                placeholder="Search pages"
            />
        </div>
    {:else}
        <div class="mr-auto w-full"></div>
    {/if}
    {@render children()}
</div>
