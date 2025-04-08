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
        class?: string;
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
            'z-50 flex w-full min-w-48 origin-top-right flex-col items-start gap-[1px] rounded-md border border-surface-100 bg-white shadow-lg',
            position ? 'fixed' : 'absolute -bottom-2 right-0 translate-y-full',
            noPadding ? 'p-0' : 'p-1',
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
