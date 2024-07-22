<script lang="ts">
    import { Wallet } from 'lucide-svelte';
    import type { Snippet } from 'svelte';

    import { isCurrentPath, pathTo } from '$lib/config';

    type Props = { children: Snippet };
    let { children }: Props = $props();

    type Tab = { name: string; href: string };
    const tabs: Tab[] = [
        { name: 'Dashboard', href: pathTo('app') },
        { name: 'Expenses', href: '/expenses' },
        { name: 'Other', href: '/other' }
    ];
</script>

<div class="flex min-h-screen w-full flex-col bg-background md:flex-row">
    <div
        class="flex min-h-screen flex-col gap-1 border-r border-secondary-100 bg-secondary-50 px-6 py-8 md:min-w-64"
    >
        <header class="mb-12 flex items-center justify-between gap-2">
            <p class="text-2xl font-bold">Finance</p>
            <Wallet class="size-6" strokeWidth={2} />
        </header>
        <nav class="pb-4">
            <ul class="flex w-full flex-col gap-1">
                {#each tabs as { name, href } (href)}
                    <li>
                        <a
                            class="block w-full cursor-pointer rounded px-3 py-2 font-semibold text-secondary-800 transition-colors aria-[current=true]:bg-secondary-100 aria-[current=false]:hover:bg-secondary-100"
                            {href}
                            role="tab"
                            aria-current={isCurrentPath(href)}
                        >
                            {name}
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>
    </div>

    <main class="h-full w-full flex-1">
        {@render children()}
    </main>
</div>
