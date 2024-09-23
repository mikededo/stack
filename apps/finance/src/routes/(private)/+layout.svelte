<script lang="ts">
    import type { Snippet } from 'svelte';

    import { afterNavigate, beforeNavigate, onNavigate } from '$app/navigation';

    type Props = { children: Snippet };
    const { children }: Props = $props();

    let paramChanges = $state(false);
    let loaderWidth = $state(0);
    let loaderOpacity = $state(100);

    beforeNavigate(({ from, to }) => {
        if (to?.url.pathname === from?.url.pathname && to?.url.search !== from?.url.search) {
            paramChanges = true;
            return;
        }

        loaderOpacity = 100;
        loaderWidth = 25;
    });

    onNavigate(() => {
        if (paramChanges) {
            return;
        }
        // Random number between 45 and 75
        loaderWidth = Math.floor(Math.random() * 45 + 55);
    });

    afterNavigate(() => {
        if (paramChanges) {
            paramChanges = false;
            return;
        }

        loaderWidth = 100;
        const opacityTimeout = setTimeout(() => {
            loaderOpacity = 0;
        }, 500);
        const widthTimeout = setTimeout(() => {
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
