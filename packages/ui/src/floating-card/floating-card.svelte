<script lang="ts">
    import { clickAway, useActions } from '@mstack/actions';
    import type { ActionArray } from '@mstack/actions';

    import type { Snippet } from 'svelte';
    import { cubicInOut } from 'svelte/easing';
    import type { HTMLAttributes } from 'svelte/elements';
    import { fade } from 'svelte/transition';
    import { twMerge } from 'tailwind-merge';

    type Props = HTMLAttributes<HTMLDivElement> & {
        position?: { top: number; left: number; width: number };
        children: Snippet;
        onClickAway?: Parameters<typeof clickAway>[1];
        use?: ActionArray;
    };
    let { children, position, onClickAway, use = [], ...restProps }: Props = $props();

    let positionStyle = $derived(
        position
            ? `top: ${position.top}px; left: ${position.left}px; width: ${position.width}px;`
            : undefined
    );
    let classes = $derived(
        twMerge(
            'ui-z-10 ui-flex ui-w-full ui-min-w-48 ui-origin-top-right ui-flex-col ui-items-start ui-gap-[1px] ui-rounded-lg ui-border ui-border-secondary-100 ui-bg-white ui-p-1 ui-shadow-lg',
            position ? 'ui-fixed' : 'ui-absolute -ui-bottom-2 ui-right-0 ui-translate-y-full',
            restProps.class
        )
    );
</script>

<div
    {...restProps}
    style={positionStyle}
    class={classes}
    transition:fade={{ duration: 150, easing: cubicInOut }}
    use:useActions={use}
>
    {@render children()}
</div>
