<script lang="ts">
    import type { Snippet } from 'svelte';

    import '../global.css';

    import { Toaster } from '@stack/ui';

    import type { LayoutData } from './$types';

    import { setContext } from 'svelte';
    import { fade } from 'svelte/transition';

    type Props = { children: Snippet; data: LayoutData };
    const { children, data }: Props = $props();

    setContext('shiki', data.shiki);
</script>

{#key data.pathname}
    <main
        class="container relative border-x divide-y flex min-h-[calc(100vh-48px)] flex-col bg-white"
        in:fade={{ delay: 100, duration: 100 }}
        out:fade={{ duration: 100 }}
    >
        {@render children()}
    </main>
{/key}

<footer class="mt-auto flex h-12 w-full items-center border-t justify-center bg-gray-50 text-sm">
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
