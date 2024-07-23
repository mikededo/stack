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

<div class="bg-background flex min-h-screen w-full flex-col md:flex-row">
    <div
        class="border-secondary-100 bg-secondary-50 flex min-h-screen flex-col gap-1 border-r px-6 py-10 md:min-w-64"
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
                            class="text-secondary-800 aria-[current=true]:bg-secondary-100 aria-[current=false]:hover:bg-secondary-100 block w-full cursor-pointer rounded px-3 py-2 font-semibold transition-colors"
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

    <main class="flex h-full min-h-screen flex-1 flex-col gap-12 px-10 py-8">
        {@render children()}
    </main>
</div>
