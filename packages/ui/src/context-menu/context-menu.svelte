<script lang="ts">
    import { clickAway, portal } from '@mstack/actions';

    import { Copy } from 'lucide-svelte';
    import { cubicInOut } from 'svelte/easing';
    import { scale } from 'svelte/transition';

    import type { Menu } from './context.svelte.ts';

    type Props = { menu: Menu };
    let { menu }: Props = $props();

    const handleOnCloseContextMenu = () => {};
</script>

{#snippet button()}
    <button
        class="ui-flex ui-w-full ui-items-center ui-gap-2 ui-rounded-md ui-px-3 ui-py-2 ui-text-left ui-text-sm hover:ui-bg-secondary-50"
        onclick={handleOnCloseContextMenu}
    >
        <Copy class="size-4" strokeWidth={2.5} />
        <span>Copy</span>
    </button>
{/snippet}

{#if menu.state}
    <div
        class="ui-fixed ui-z-10 ui-flex ui-w-48 ui-origin-top-left ui-flex-col ui-items-start ui-gap-[1px] ui-rounded-lg ui-border ui-border-secondary-100 ui-bg-white ui-p-1 ui-shadow-md"
        style="top: {menu.state.y}px; left: {menu.state.x}px;"
        transition:scale={{ duration: 150, easing: cubicInOut }}
        use:portal={'portal'}
        use:clickAway={menu.hide}
    >
        {@render button()}
        {@render button()}
        {@render button()}
        {@render button()}
        {@render button()}
    </div>
{/if}
