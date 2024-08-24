<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { SvelteHTMLElements } from 'svelte/elements';

    import { twMerge } from 'tailwind-merge';

    type ChipVariant = 'primary';

    type BaseProps = {
        children: Snippet;
    } & ({ color: string; variant?: never } | { color?: never; variant: ChipVariant });
    type Props = BaseProps & SvelteHTMLElements['span'];
    let { children, color, variant, ...restProps }: Props = $props();

    const classes = $derived(
        twMerge(
            'ui-rounded-full ui-px-2 ui-py-1 ui-text-xs ui-font-semibold',
            variant === 'primary' && 'ui-bg-primary/25 ui-text-primary',
            restProps.class
        )
    );
    const style = $derived(variant ? undefined : `background-color: ${color}44; color: ${color}`);
</script>

<span {...restProps} class={classes} {style}>
    {@render children()}
</span>
