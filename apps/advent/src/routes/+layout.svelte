<script lang="ts">
    import type { Snippet } from 'svelte';

    import '../global.css';

    import { Toaster } from '@stack/ui';

    import type { LayoutData } from './$types';

    import { setContext } from 'svelte';
    import { fade } from 'svelte/transition';

    import { VGRidLine } from '$lib/components';

    type Props = { children: Snippet; data: LayoutData };
    const { children, data }: Props = $props();

    setContext('shiki', data.shiki);
</script>

<main
    class="container relative overflow-x-hidden flex min-h-[calc(100vh-48px)] flex-col bg-white"
    style="scrollbar-gutter: auto;"
>
    {#key data.pathname}
        <div in:fade={{ delay: 100, duration: 100 }} out:fade={{ duration: 100 }}>
            {@render children()}
        </div>
    {/key}

    <VGRidLine class="hidden lg:block" delay={0.15} />
    <VGRidLine class="hidden lg:block" right delay={0.2} />
</main>

<footer
    class="mt-auto flex h-12 items-center justify-center bg-gray-50 w-auto max-w-screen relative h-grid-line text-sm overflow-hidden"
>
    <p>
        Designed and developed by
        <a
            href="https://github.com/mikededo"
            rel="external"
            target="_blank"
        >
            @mikededo
        </a>
    </p>
</footer>

<Toaster />
