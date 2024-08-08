<script lang="ts">
    import type { Snippet } from 'svelte';

    import { Input } from '@mstack/ui';

    import { fade } from 'svelte/transition';

    import { getListContext } from './context.svelte';

    type Props = { children: Snippet };
    let { children }: Props = $props();

    let listState = getListContext();
</script>

<div class="flex flex-row items-center justify-end gap-0.5 md:gap-1">
    {#if listState.view === 'pages'}
        <div class="mr-auto w-full" transition:fade={{ duration: 100 }}>
            <Input
                class="w-full max-w-96 text-sm"
                bind:value={listState.keywords}
                color="secondary"
                placeholder="Search pages"
            />
        </div>
    {:else}
        <div class="mr-auto w-full"></div>
    {/if}
    {@render children()}
</div>
