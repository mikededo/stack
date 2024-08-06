<script lang="ts">
    import type { ActionArray } from '@mstack/actions';
    import { useActions } from '@mstack/actions';

    import type { HTMLLiAttributes } from 'svelte/elements';
    import { twMerge } from 'tailwind-merge';

    type Props = HTMLLiAttributes & {
        hoverable?: boolean;
        use?: ActionArray;
    };
    let { hoverable, use = [], ...restProps }: Props = $props();

    let classes = $derived(
        twMerge(
            'ui-border-b ui-border-secondary-100 ui-transition-colors odd:ui-bg-secondary-50 last-of-type:ui-border-0',
            hoverable &&
                'ui-cursor-pointer hover:ui-bg-secondary-100/50 active:ui-bg-secondary-100',
            restProps.class
        )
    );
</script>

<li {...restProps} class={classes} use:useActions={use}>
    {#if restProps.children}
        {@render restProps.children()}
    {/if}
</li>
