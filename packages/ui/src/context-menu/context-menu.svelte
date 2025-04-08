<script lang="ts">
    import { clickAway, portal } from '@stack/actions';

    import type { Menu } from './context.svelte.ts';
    import type { ContextMenuOption, Option } from './types.js';

    import { cubicInOut } from 'svelte/easing';
    import { scale } from 'svelte/transition';
    import { twMerge } from 'tailwind-merge';

    type Props = { menu: Menu; options: ContextMenuOption[] };
    const { menu, options }: Props = $props();

    const onClick = (onClick: Required<Option>['onClick']) => () => {
        menu.hide();
        onClick();
    };

    const getOptionClasses = ({ destructive, onClick }: Option) =>
        twMerge(
            'flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors duration-100 aria-disabled:cursor-not-allowed aria-disabled:text-surface-400 hover:aria-disabled:bg-transparent disabled:cursor-not-allowed disabled:text-surface-400 disabled:hover:bg-transparent',
            onClick && 'hover:bg-surface-50',
            destructive && 'text-destructive-500 hover:bg-destructive-50! focus:bg-destructive-50 active:bg-destructive-50'
        );
</script>

{#snippet content({ Icon, text }: Omit<Option, 'onClick'>)}
    {#if Icon}
        <Icon class="size-4" strokeWidth={2} />
    {/if}
    <span>{text}</span>
{/snippet}

{#snippet option(opt: Option)}
    {#if opt.onClick}
        <button
            class={getOptionClasses(opt)}
            disabled={opt.disabled}
            onclick={onClick(opt.onClick)}
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
        class="fixed z-10 flex w-48 origin-top-left flex-col items-start gap-[1px] rounded-md border border-surface-200 bg-white p-1"
        use:clickAway={menu.hide}
        use:portal={'portal'}
        style="top: {menu.state.y}px; left: {menu.state.x}px;"
        transition:scale={{ duration: 150, easing: cubicInOut }}
    >
        {#each options as o}
            {#if o === 'divider'}
                <div
                    class="mx-auto my-2 h-[1px] w-[90%] bg-surface-100/75"
                    role="separator"
                ></div>
            {:else}
                {@render option(o)}
            {/if}
        {/each}
    </div>
{/if}
