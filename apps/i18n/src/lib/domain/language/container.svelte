<script lang="ts">
    import type { Snippet } from 'svelte';

    import { twMerge } from 'tailwind-merge';

    type Props = { children: Snippet; class?: string };
    const { children, class: className }: Props = $props();

    const classes = $derived(twMerge('flex gap-1 text-xs', className));
</script>

<div class={classes}>
    {@render children()}
</div>
