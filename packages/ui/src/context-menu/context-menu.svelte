<script lang="ts" context="module">
    import { Icon as LucideIcon } from 'lucide-svelte';
    import type { ComponentType } from 'svelte';

    type Option = {
        text: string;
        Icon?: ComponentType<LucideIcon>;
        onClick?: () => void;
        destructive?: boolean;
        disabled?: boolean;
    };
    type Divider = 'divider';

    export type ContextMenuOption = Option | Divider;
</script>

<script lang="ts">
    import { clickAway, portal } from '@mstack/actions';

    import { cubicInOut } from 'svelte/easing';
    import { scale } from 'svelte/transition';
    import { twMerge } from 'tailwind-merge';

    import type { Menu } from './context.svelte.ts';

    type Props = { menu: Menu; options: ContextMenuOption[] };
    let { menu, options }: Props = $props();

    const handleOnClick = (onClick: Required<Option>['onClick']) => () => {
        menu.hide();
        onClick();
    };

    const getOptionClasses = ({ onClick, destructive }: Option) =>
        twMerge(
            'ui-flex ui-w-full ui-items-center ui-gap-2 ui-rounded-md ui-px-3 ui-py-2 ui-text-left ui-text-sm ui-transition-colors ui-duration-100 disabled:ui-cursor-not-allowed disabled:ui-text-secondary-400 disabled:hover:ui-bg-transparent aria-disabled:ui-cursor-not-allowed aria-disabled:ui-text-secondary-400 aria-disabled:hover:ui-bg-transparent',
            onClick && 'hover:ui-bg-secondary-50',
            destructive &&
                'ui-text-destructive-500 hover:!ui-bg-destructive-50 focus:ui-bg-destructive-50 active:ui-bg-destructive-50'
        );
</script>

{#snippet content({ text, Icon }: Omit<Option, 'onClick'>)}
    {#if Icon}
        <svelte:component this={Icon} class="size-4" strokeWidth={2} />
    {/if}
    <span>{text}</span>
{/snippet}

{#snippet option(opt: Option)}
    {#if opt.onClick}
        <button
            class={getOptionClasses(opt)}
            onclick={handleOnClick(opt.onClick)}
            disabled={opt.disabled}
        >
            {@render content(opt)}
        </button>
    {:else}
        <div class={getOptionClasses(opt)} aria-disabled={opt.disabled}>
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
            {#if o === 'divider'}
                <div
                    role="separator"
                    class="ui-mx-auto ui-my-2 ui-h-[1px] ui-w-[90%] ui-bg-secondary-100/75"
                ></div>
            {:else}
                {@render option(o)}
            {/if}
        {/each}
    </div>
{/if}
