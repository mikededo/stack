<script lang="ts">
    import type { Icon as LucideIcon } from 'lucide-svelte';
    import type { ComponentType, Snippet } from 'svelte';

    import { Logo } from '@stack/ui';

    import { Ellipsis } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    type Tab = {
        href: string;
        name: string;
        Icon: ComponentType<LucideIcon>;
        disabled?: boolean;
    };
    type Props = {
        children: Snippet;
        isPageActive: (href: string) => boolean;
        /**
         * Pathname needs to be provided as the layout has a transition on changing pages
         */
        pathname: string;
        userName: string;
        tabs?: Tab[];
        /**
         * Page change transition.
         * @default true
         */
        transition?: boolean;
    };
    const { children, isPageActive, pathname, tabs = [], transition = true, userName }: Props = $props();
</script>

<header class="hidden h-top-bar border-b border-surface-200 w-full md:flex">
    <div class="hidden h-full items-center gap-2 bg-transparent px-4 md:flex md:min-w-64">
        <Logo />
        <p class="font-bold">Stack</p>
    </div>
    <div class="flex h-full w-full items-center justify-end pr-5">
        <span
            class="cursor-pointer text-sm text-surface-700 underline decoration-transparent underline-offset-1 transition-colors hover:decoration-surface-700"
        >
            Welcome back, {userName}!
        </span>
    </div>
</header>

<div class="flex w-full flex-col overflow-hidden bg-background">
    {#if tabs.length}
        <nav class="w-full border-b hidden md:block">
            <ul class="flex gap-1 items-center justify-center">
                {#each tabs as { disabled, href, name } (href)}
                    <li>
                        <a
                            class="flex w-full cursor-pointer items-center border-b-2 border-transparent h-12 justify-between px-3 py-2 text-sm font-semibold transition-colors aria-disabled:pointer-events-none aria-disabled:text-surface-400 aria-current:border-primary hover:aria-not-current:text-foreground aria-current:text-primary aria-not-current:text-surface-800 hover:aria-not-current:border-primary"
                            aria-current={isPageActive(href)}
                            aria-disabled={disabled}
                            role="tab"
                            {href}
                        >
                            <span>{name}</span>
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>

        <!-- Mobile navigation -->
        <header class="block md:hidden">
            <nav class="flex h-12 items-center justify-between px-2">
                <div class="flex items-center gap-2">
                    <Logo />
                    <p class="font-bold">Stack</p>
                </div>
                <Ellipsis class="size-4" strokeWidth={2.5} />
            </nav>
        </header>
    {/if}

    <main class="scrollbar-thin">
        {#key pathname}
            <div
                class="flex flex-col gap-4 overflow-y-auto p-6 md:px-10"
                class:h-content={!tabs.length}
                class:h-content-nav={tabs.length > 0}
                in:fade={{ delay: 100, duration: transition ? 100 : 0 }}
                out:fade={{ duration: transition ? 100 : 0 }}
            >
                {@render children()}
            </div>
        {/key}
    </main>
</div>
