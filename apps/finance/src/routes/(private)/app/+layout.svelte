<script lang="ts">
    import type { ComponentType, Snippet } from 'svelte';

    import { setUserDataContext } from '@stack/svelte-supabase';
    import { Logo } from '@stack/ui';

    import {
        DollarSign,
        Ellipsis,
        LayoutDashboard,
        Icon as LucideIcon,
        PiggyBank
    } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import { page } from '$app/stores';
    import { isNestedPath, pathTo } from '$lib/config';

    import type { LayoutData } from './$types';

    type Props = { children: Snippet; data: LayoutData };
    let { children, data }: Props = $props();

    setUserDataContext(data.user);

    type Tab = { disabled?: boolean; href: string; Icon: ComponentType<LucideIcon>; name: string };
    const tabs: Tab[] = [
        { href: pathTo('app'), Icon: LayoutDashboard, name: 'Dashboard' },
        { href: pathTo('budget'), Icon: PiggyBank, name: 'Budget' },
        { disabled: true, href: '/expenses', Icon: DollarSign, name: 'Expenses' }
    ];
</script>

<header class="hidden h-12 w-full bg-surface-50 md:flex">
    <div class="hidden h-full items-center gap-2 bg-transparent px-4 md:flex md:min-w-64">
        <Logo />
        <p class="font-bold">Stack</p>
    </div>
    <div class="flex h-full w-full items-center justify-end pr-5">
        <!-- TODO: Add user preferences -->
        <span
            class="cursor-pointer text-sm text-surface-700 underline decoration-transparent underline-offset-1 transition-colors hover:decoration-surface-700"
        >
            Welcome back, {data.user.first_name}!
        </span>
    </div>
</header>

<div class="flex w-full flex-col overflow-hidden bg-background bg-surface-50 md:flex-row">
    <!-- Desktop navigation-->
    <div class="hidden h-content-md overflow-x-hidden px-2 md:block md:min-w-64">
        <nav class="h-full gap-1 py-10">
            <ul class="flex w-full flex-col gap-1">
                {#each tabs as { disabled, href, Icon, name } (href)}
                    <li>
                        <a
                            class="flex w-full cursor-pointer items-center justify-between rounded px-3 py-2 text-sm font-semibold transition-colors aria-disabled:pointer-events-none aria-disabled:text-surface-400 aria-current:bg-primary-100 aria-current:text-primary aria-not-current:hover:bg-primary-100"
                            aria-disabled={disabled}
                            role="tab"
                            {href}
                            aria-current={href === $page.url.pathname ||
                                isNestedPath(href, $page.url.pathname)}
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
    <header class="block bg-surface-50 md:hidden">
        <nav class="flex h-12 items-center justify-between px-2">
            <div class="flex items-center gap-2">
                <Logo />
                <p class="font-bold">Stack</p>
            </div>
            <Ellipsis class="size-4" strokeWidth={2.5} />
        </nav>
    </header>

    <div class="h-full w-full px-2 pb-2 pt-0 md:pb-4 md:pl-4">
        <main
            class="w-full flex-1 overflow-hidden rounded-lg border border-surface-200 bg-white md:w-content-md"
        >
            {#key data.pathname}
                <div
                    class="flex h-content flex-col gap-4 overflow-y-auto p-6 md:h-content-md md:px-10 md:py-8"
                    in:fade={{ delay: 100, duration: 100 }}
                    out:fade={{ duration: 100 }}
                >
                    {@render children()}
                </div>
            {/key}
        </main>
    </div>
</div>
