<script lang="ts">
    import type { Snippet } from 'svelte';

    import { type SvelteHTMLElements } from 'svelte/elements';
    import { twMerge } from 'tailwind-merge';

    type Props = { children: Snippet; color: string } & SvelteHTMLElements['span'];
    let { children, color, ...restProps }: Props = $props();

    let classes = $derived(
        twMerge('ui-rounded-full ui-px-2 ui-py-1 ui-text-xs ui-font-semibold', restProps.class)
    );
</script>

<span class={classes} style="background-color: {color}44; color: {color}" {...restProps}>
    {@render children()}
</span>
