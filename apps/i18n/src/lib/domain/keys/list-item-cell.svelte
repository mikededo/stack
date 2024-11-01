<script lang="ts">
    import type { Snippet } from 'svelte';

    import { twMerge } from 'tailwind-merge';

    type Props = {
        children: Snippet;
        class?: string;
        header?: boolean;
        sticky?: boolean;
    };
    const { children, header, sticky, ...rest }: Props = $props();
    const classes = $derived(
        twMerge(
            'w-48 shrink-0 px-4 py-3',
            header && 'font-semibold',
            sticky && 'sticky left-0 md:w-56 bg-white',
            header && sticky && 'bg-surface-50',
            rest.class
        )
    );
</script>

<div class={classes} role="cell">
    {@render children()}
</div>
