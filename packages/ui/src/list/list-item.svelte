<script lang="ts">
    import type { ActionArray } from '@mstack/actions';

    import type { HTMLLiAttributes } from 'svelte/elements';

    import { useActions } from '@mstack/actions';

    import { twMerge } from 'tailwind-merge';

    type Props = {
        hoverable?: boolean;
        use?: ActionArray;
    } & HTMLLiAttributes;
    let { hoverable, use = [], ...restProps }: Props = $props();

    let classes = $derived(
        twMerge(
            'ui-border-secondary-100 odd:ui-bg-secondary-50 ui-border-b ui-transition-colors last-of-type:ui-border-0',
            hoverable &&
                'hover:ui-bg-secondary-100/50 active:ui-bg-secondary-100 ui-cursor-pointer',
            restProps.class
        )
    );
</script>

<li {...restProps} class={classes} use:useActions={use}>
    {#if restProps.children}
        {@render restProps.children()}
    {/if}
</li>
