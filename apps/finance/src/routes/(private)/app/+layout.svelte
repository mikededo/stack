<script lang="ts">
    import type { ComponentType, Snippet } from 'svelte';

    import {
        DollarSign,
        Ellipsis,
        LayoutDashboard,
        Icon as LucideIcon,
        Wallet
    } from 'lucide-svelte';

    import { isNestedPath, pathTo } from '$lib/config';

    type Props = { children: Snippet };
    let { children }: Props = $props();

    type Tab = { href: string; Icon: ComponentType<LucideIcon>; name: string };
    const tabs: Tab[] = [
        { href: pathTo('app'), Icon: LayoutDashboard, name: 'Dashboard' },
        { href: '/expenses', Icon: DollarSign, name: 'Expenses' }
    ];
</script>

<div class="flex h-screen w-full flex-col overflow-hidden bg-background md:flex-row">
    <!-- Desktop navigation-->
    <div
        class="my-auto hidden h-[calc(100vh_-_4rem)] overflow-x-hidden rounded-r-[2rem] bg-secondary-100 md:block md:min-w-64"
    >
        <nav class="h-full gap-1 px-6 py-10">
            <ul class="flex w-full flex-col gap-1">
                {#each tabs as { href, Icon, name } (href)}
                    <li>
                        <a
                            class="flex w-full cursor-pointer items-center justify-between rounded px-3 py-2 font-semibold transition-colors aria-current:bg-secondary-200 aria-not-current:hover:bg-secondary-200"
                            aria-current={isNestedPath(href, 'app')}
                            role="tab"
                            {href}
                        >
                            <span>{name}</span>
                            <svelte:component this={Icon} class="size-4" strokeWidth={2} />
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>
    </div>

    <!-- Mobile navigation -->
    <header class="block border-b border-secondary-100 bg-secondary-50 md:hidden">
        <nav class="flex h-10 items-center justify-between px-6">
            <div class="flex items-center gap-2">
                <Wallet class="size-4" strokeWidth={2.5} />
                <p class="text-lg font-semibold">Finance</p>
            </div>
            <Ellipsis class="size-4" strokeWidth={2.5} />
        </nav>
    </header>

    <main
        class="flex h-top-bar-sm flex-1 flex-col gap-4 p-6 pb-0 md:h-screen md:max-w-[calc(100vw_-_256px)] md:px-10 md:pt-8"
    >
        {@render children()}
    </main>
</div>
