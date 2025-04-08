<script lang="ts">
    import type { Snippet } from 'svelte';

    import { sineOut } from 'svelte/easing';
    import { scale } from 'svelte/transition';
    import { twMerge } from 'tailwind-merge';

    type Props = { children: Snippet; show: boolean; containerClass?: string };
    const { children, containerClass, show }: Props = $props();
</script>

<div class={twMerge('relative', containerClass)}>
    {#if show}
        <div
            class="absolute right-0 top-0 z-10 box-content size-3 origin-center -translate-y-1/4 translate-x-1/4 rounded-full border-4 border-solid border-white bg-primary"
            transition:scale={{ duration: 100, easing: sineOut }}
        ></div>
    {/if}
    {@render children()}
</div>
