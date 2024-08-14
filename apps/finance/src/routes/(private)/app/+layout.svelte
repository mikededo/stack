<script lang="ts">
    import type { ComponentType, Snippet } from 'svelte';

    import { setUserDataContext } from '@mstack/svelte-supabase';

    import {
        DollarSign,
        Ellipsis,
        LayoutDashboard,
        Icon as LucideIcon,
        Wallet
    } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import { isNestedPath, pathTo } from '$lib/config';

    import type { LayoutData } from './$types';

    type Props = { children: Snippet; data: LayoutData };
    let { children, data }: Props = $props();

    setUserDataContext(data.user);

    type Tab = { href: string; Icon: ComponentType<LucideIcon>; name: string };
    const tabs: Tab[] = [
        { href: pathTo('app'), Icon: LayoutDashboard, name: 'Dashboard' },
        { href: '/expenses', Icon: DollarSign, name: 'Expenses' }
    ];
</script>

<header class="hidden h-12 w-full border-b border-surface-100 bg-white md:flex">
    <div
        class="hidden h-full overflow-x-hidden border-r border-surface-100 md:block md:min-w-64"
    ></div>
    <div class="flex h-full w-full items-center justify-end bg-surface-50 pr-10">
        <span class="text-sm text-surface-700">Welcome back, Miquel!</span>
    </div>
</header>

<div
    class="flex h-screen w-full flex-col overflow-hidden bg-background bg-surface-100 md:h-top-bar-md md:flex-row"
>
    <!-- Desktop navigation-->
    <div
        class="hidden h-top-bar-md overflow-x-hidden border-r border-surface-100 bg-white md:block md:min-w-64"
    >
        <nav class="h-full gap-1 px-6 py-10">
            <ul class="flex w-full flex-col gap-1">
                {#each tabs as { href, Icon, name } (href)}
                    <li>
                        <a
                            class="flex w-full cursor-pointer items-center justify-between rounded px-3 py-2 font-semibold transition-colors aria-current:bg-primary-100 aria-not-current:hover:bg-primary-100"
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
    <header class="block border-b border-surface-100 bg-surface-50 md:hidden">
        <nav class="flex h-10 items-center justify-between px-6">
            <div class="flex items-center gap-2">
                <Wallet class="size-4" strokeWidth={2.5} />
                <p class="text-lg font-semibold">Finance</p>
            </div>
            <Ellipsis class="size-4" strokeWidth={2.5} />
        </nav>
    </header>

    <main
        class="h-top-bar-sm flex-1 overflow-hidden border border-transparent bg-white p-6 py-8 md:h-top-bar-md md:max-w-[calc(100vw_-_256px)] md:px-10"
    >
        {#key data.pathname}
            <div
                class="flex flex-col gap-4"
                in:fade={{ delay: 100, duration: 100 }}
                out:fade={{ duration: 100 }}
            >
                {@render children()}
            </div>
        {/key}
    </main>
</div>
