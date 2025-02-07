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
            'ui:flex ui:w-full ui:items-center ui:gap-2 ui:rounded-sm ui:px-3 ui:py-2 ui:text-left ui:text-sm ui:transition-colors ui:duration-100 ui:aria-disabled:cursor-not-allowed ui:aria-disabled:text-surface-400 ui:hover:aria-disabled:bg-transparent ui:disabled:cursor-not-allowed ui:disabled:text-surface-400 ui:disabled:hover:bg-transparent',
            onClick && 'ui:hover:bg-surface-50',
            destructive && 'ui:text-destructive-500 ui:hover:bg-destructive-50! ui:focus:bg-destructive-50 ui:active:bg-destructive-50'
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
        class="ui:fixed ui:z-10 ui:flex ui:w-48 ui:origin-top-left ui:flex-col ui:items-start ui:gap-[1px] ui:rounded-md ui:border ui:border-surface-200 ui:bg-white ui:p-1"
        use:clickAway={menu.hide}
        use:portal={'portal'}
        style="top: {menu.state.y}px; left: {menu.state.x}px;"
        transition:scale={{ duration: 150, easing: cubicInOut }}
    >
        {#each options as o}
            {#if o === 'divider'}
                <div
                    class="ui:mx-auto ui:my-2 ui:h-[1px] ui:w-[90%] ui:bg-surface-100/75"
                    role="separator"
                ></div>
            {:else}
                {@render option(o)}
            {/if}
        {/each}
    </div>
{/if}
