<script lang="ts" context="module">
    import { Icon as LucideIcon } from 'lucide-svelte';
    import type { ComponentType } from 'svelte';

    type Option = { text: string; Icon?: ComponentType<LucideIcon>; onClick?: () => void };

    export type ContextMenuOption = Option;
</script>

<script lang="ts">
    import { clickAway, portal } from '@mstack/actions';

    import { cubicInOut } from 'svelte/easing';
    import { scale } from 'svelte/transition';

    import type { Menu } from './context.svelte.ts';

    type Props = { menu: Menu; options: Option[] };
    let { menu, options }: Props = $props();

    const handleOnClick = (onClick: Required<Option>['onClick']) => () => {
        menu.hide();
        onClick();
    };
</script>

{#snippet content({ text, Icon }: Omit<Option, 'onClick'>)}
    {#if Icon}
        <svelte:component this={Icon} class="size-4" strokeWidth={2} />
    {/if}
    <span>{text}</span>
{/snippet}

{#snippet option({ onClick, ...opt }: Option)}
    {#if onClick}
        <button
            class="ui-flex ui-w-full ui-items-center ui-gap-2 ui-rounded-md ui-px-3 ui-py-2 ui-text-left ui-text-sm hover:ui-bg-secondary-50"
            onclick={handleOnClick(onClick)}
        >
            {@render content(opt)}
        </button>
    {:else}
        <div
            class="ui-flex ui-w-full ui-items-center ui-gap-2 ui-rounded-md ui-px-3 ui-py-2 ui-text-left ui-text-sm"
        >
            {@render content(opt)}
        </div>
    {/if}
{/snippet}

{#if menu.state}
    <div
        class="ui-fixed ui-z-10 ui-flex ui-w-48 ui-origin-top-left ui-flex-col ui-items-start ui-gap-[1px] ui-rounded-lg ui-border ui-border-secondary-100 ui-bg-white ui-p-1 ui-shadow-md"
        style="top: {menu.state.y}px; left: {menu.state.x}px;"
        transition:scale={{ duration: 150, easing: cubicInOut }}
        use:portal={'portal'}
        use:clickAway={menu.hide}
    >
        {#each options as o}
            {@render option(o)}
        {/each}
    </div>
{/if}
