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
            'ui:border-b ui:border-primary-100 ui:transition-colors ui:last-of-type:border-0',
            hoverable && 'ui:cursor-pointer ui:hover:bg-primary-100/50 ui:active:bg-primary-100',
            restProps.class
        )
    );
</script>

<li {...restProps} class={classes} use:useActions={use}>
    {#if restProps.children}
        {@render restProps.children()}
    {/if}
</li>
