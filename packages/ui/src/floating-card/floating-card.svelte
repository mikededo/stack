<script lang="ts">
    import type { ActionArray } from '@mstack/actions';

    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    import { clickAway, useActions } from '@mstack/actions';

    import { cubicInOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';
    import { twMerge } from 'tailwind-merge';

    type Props = {
        children: Snippet;
        onClickAway?: Parameters<typeof clickAway>[1];
        position?: { left: number; top: number; width: number };
        use?: ActionArray;
    } & HTMLAttributes<HTMLDivElement>;
    let { children, onClickAway, position, use = [], ...restProps }: Props = $props();

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
    class={classes}
    use:useActions={use}
    style={positionStyle}
    transition:fade={{ duration: 150, easing: cubicInOut }}
>
    {@render children()}
</div>
