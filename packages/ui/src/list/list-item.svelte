<script lang="ts">
    import type { ActionArray } from '@stack/actions';

    import type { HTMLLiAttributes } from 'svelte/elements';

    import { useActions } from '@stack/actions';

    import { twMerge } from 'tailwind-merge';

    type Props = {
        use?: ActionArray;
        hoverable?: boolean;
    } & HTMLLiAttributes;
    const { hoverable, use = [], ...restProps }: Props = $props();

    const classes = $derived(
        twMerge(
            'border-b border-primary-100 transition-colors last-of-type:border-0',
            hoverable && 'cursor-pointer hover:bg-primary-100/50 active:bg-primary-100',
            restProps.class
        )
    );
</script>

<li {...restProps} class={classes} use:useActions={use}>
    {#if restProps.children}
        {@render restProps.children()}
    {/if}
</li>
