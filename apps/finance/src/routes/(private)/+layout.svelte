<script lang="ts">
    import type { Snippet } from 'svelte';

    import { afterNavigate, beforeNavigate, onNavigate } from '$app/navigation';

    type Props = { children: Snippet };
    let { children }: Props = $props();

    let loaderWidth = $state(0);
    let loaderOpacity = $state(100);

    beforeNavigate(() => {
        loaderOpacity = 100;
        loaderWidth = 25;
    });

    onNavigate(() => {
        // Random number between 45 and 75
        loaderWidth = Math.floor(Math.random() * 45 + 55);
    });

    afterNavigate(() => {
        loaderWidth = 100;
        let opacityTimeout = setTimeout(() => {
            loaderOpacity = 0;
        }, 500);
        let widthTimeout = setTimeout(() => {
            loaderWidth = 0;
        }, 550);

        return () => {
            clearTimeout(opacityTimeout);
            clearTimeout(widthTimeout);
        };
    });
</script>

<div
    class="fixed left-0 top-0 h-0.5 bg-primary transition-all"
    style="width: {loaderWidth}%; opacity: {loaderOpacity}%"
></div>
{@render children()}
