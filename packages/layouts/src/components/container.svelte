<script lang="ts">
    import type { Snippet } from 'svelte';

    import { twMerge } from 'tailwind-merge';

    type Props = { children: Snippet; class?: string };
    const { children, class: className }: Props = $props();
    const classes = $derived(twMerge('container p-6 xl:px-0', className));
</script>

<div class={classes}>
    {@render children()}
</div>
