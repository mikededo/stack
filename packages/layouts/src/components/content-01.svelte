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

<header class="l:hidden l:h-top-bar l:border-b l:border-surface-200 l:w-full l:md:flex">
    <div class="l:hidden l:h-full l:items-center l:gap-2 l:bg-transparent l:px-4 l:md:flex l:md:min-w-64">
        <Logo />
        <p class="l:font-bold">Stack</p>
    </div>
    <div class="l:flex l:h-full l:w-full l:items-center l:justify-end l:pr-5">
        <span
            class="l:cursor-pointer l:text-sm l:text-surface-700 l:underline l:decoration-transparent l:underline-offset-1 l:transition-colors l:hover:decoration-surface-700"
        >
            Welcome back, {userName}!
        </span>
    </div>
</header>

<div class="l:flex l:w-full l:flex-col l:overflow-hidden l:bg-background">
    {#if tabs.length}
        <nav class="l:w-full l:border-b l:hidden l:md:block">
            <ul class="l:flex l:gap-1 l:items-center l:justify-center">
                {#each tabs as { disabled, href, name } (href)}
                    <li>
                        <a
                            class="l:flex l:w-full l:cursor-pointer l:items-center l:border-b-2 l:border-transparent l:h-12 l:justify-between l:px-3 l:py-2 l:text-sm l:font-semibold l:transition-colors l:aria-disabled:pointer-events-none l:aria-disabled:text-surface-400 l:aria-current:border-primary l:hover:aria-not-current:text-foreground l:aria-current:text-primary l:aria-not-current:text-surface-800 l:hover:aria-not-current:border-primary"
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
        <header class="l:block l:md:hidden">
            <nav class="l:flex l:h-12 l:items-center l:justify-between l:px-2">
                <div class="l:flex l:items-center l:gap-2">
                    <Logo />
                    <p class="l:font-bold">Stack</p>
                </div>
                <Ellipsis class="l:size-4" strokeWidth={2.5} />
            </nav>
        </header>
    {/if}

    <main class="l:scrollbar-thin">
        {#key pathname}
            <div
                class="l:flex l:flex-col l:gap-4 l:overflow-y-auto l:p-6 l:md:px-10"
                class:l-h-content={!tabs.length}
                class:l-h-content-nav={tabs.length > 0}
                in:fade={{ delay: 100, duration: transition ? 100 : 0 }}
                out:fade={{ duration: transition ? 100 : 0 }}
            >
                {@render children()}
            </div>
        {/key}
    </main>
</div>
