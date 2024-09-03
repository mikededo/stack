<script lang="ts">
    import type { Snippet } from 'svelte';

    import { sineOut } from 'svelte/easing';
    import { scale } from 'svelte/transition';
    import { twMerge } from 'tailwind-merge';

    type Props = { children: Snippet; containerClass?: string; show: boolean };
    let { children, containerClass, show }: Props = $props();
</script>

<div class={twMerge('ui-relative', containerClass)}>
    {#if show}
        <div
            class="ui-absolute ui-right-0 ui-top-0 ui-z-10 ui-box-content ui-size-3 ui-origin-center -ui-translate-y-1/4 ui-translate-x-1/4 ui-rounded-full ui-border-4 ui-border-solid ui-border-white ui-bg-primary"
            transition:scale={{ duration: 100, easing: sineOut }}
        ></div>
    {/if}
    {@render children()}
</div>
