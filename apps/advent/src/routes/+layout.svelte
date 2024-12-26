<script lang="ts">
    import { Toaster } from '@stack/ui';

    import '../global.css';

    import type { LayoutData } from './$types';

    import { setContext, type Snippet } from 'svelte';
    import { fade } from 'svelte/transition';

    type Props = { children: Snippet; data: LayoutData };
    const { children, data }: Props = $props();

    setContext('shiki', data.shiki);
</script>

{#key data.pathname}
    <main
        class="container relative flex min-h-[calc(100vh-48px)] flex-col bg-white px-6 py-8 lg:py-12 lg:pb-28 lg:pt-16"
        in:fade={{ delay: 100, duration: 100 }}
        out:fade={{ duration: 100 }}
    >
        {@render children()}
    </main>
{/key}

<footer class="mt-auto flex h-12 w-full items-center justify-center bg-gray-50 text-sm">
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
