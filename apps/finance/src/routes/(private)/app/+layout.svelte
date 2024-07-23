<script lang="ts">
    import { Ellipsis, Wallet } from 'lucide-svelte';
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

<div class="bg-background flex h-screen w-full flex-col overflow-hidden md:flex-row">
    <!-- Desktop navigation-->
    <div
        class="border-secondary-100 bg-secondary-50 hidden min-h-screen overflow-x-hidden border-r md:block md:w-64"
    >
        <div class="flex h-full flex-col gap-1 px-6 py-10">
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
    </div>

    <!-- Mobile navigation -->

    <header class="border-secondary-100 bg-secondary-50 block border-b md:hidden">
        <nav class="flex h-10 items-center justify-between px-6">
            <div class="flex items-center gap-2">
                <Wallet class="size-4" strokeWidth={2.5} />
                <p class="text-lg font-semibold">Finance</p>
            </div>
            <Ellipsis class="size-4" strokeWidth={2.5} />
        </nav>
    </header>

    <main class="flex h-full min-h-screen flex-1 flex-col gap-4 p-6 md:gap-12 md:px-10 md:py-8">
        {@render children()}
    </main>
</div>
