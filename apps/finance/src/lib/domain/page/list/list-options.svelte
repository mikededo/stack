<script lang="ts">
    import { Input } from '@mstack/ui';

    import type { Snippet } from 'svelte';
    import { fade } from 'svelte/transition';

    import { getListContext } from './context.svelte';

    type Props = { children: Snippet };
    let { children }: Props = $props();

    let listState = getListContext();
</script>

<div class="flex flex-row items-center justify-end gap-0.5 md:gap-1">
    {#if listState.view === 'pages'}
        <div transition:fade={{ duration: 100 }} class="mr-auto w-full">
            <Input
                bind:value={listState.keywords}
                placeholder="Search pages"
                color="secondary"
                class="w-full max-w-96 text-sm"
            />
        </div>
    {:else}
        <div class="mr-auto w-full"></div>
    {/if}
    {@render children()}
</div>
