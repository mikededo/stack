<script lang="ts">
    import type { ActionArray } from '@stack/actions';

    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    import { useActions } from '@stack/actions';

    import type { FloatingCardPosition } from './types.js';

    import { cubicInOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';
    import { twMerge } from 'tailwind-merge';

    type Props = {
        children: Snippet;
        ref?: HTMLDivElement;
        use?: ActionArray;
        noPadding?: boolean;
        position?: FloatingCardPosition;
    } & HTMLAttributes<HTMLDivElement>;
    let {
        children,
        noPadding,
        position,
        ref = $bindable(),
        use = [],
        ...restProps
    }: Props = $props();

    const positionStyle = $derived(
        position
            ? `top: ${position.top}px; left: ${position.left}px; width: ${position.width}px;`
            : undefined
    );
    const classes = $derived(
        twMerge(
            'ui-z-50 ui-flex ui-w-full ui-min-w-48 ui-origin-top-right ui-flex-col ui-items-start ui-gap-[1px] ui-rounded-md ui-border ui-border-surface-100 ui-bg-white ui-shadow-lg',
            position ? 'ui-fixed' : 'ui-absolute -ui-bottom-2 ui-right-0 ui-translate-y-full',
            noPadding ? 'ui-p-0' : 'ui-p-1',
            restProps.class
        )
    );

</script>

<div
    {...restProps}
    class={classes}
    bind:this={ref}
    use:useActions={use}
    style={positionStyle}
    transition:fade={{ duration: 150, easing: cubicInOut }}
>
    {@render children()}
</div>
