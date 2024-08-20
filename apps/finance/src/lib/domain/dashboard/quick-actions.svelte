<script lang="ts">
    import { BookPlus, FileClock, FilePlus, Plus } from 'lucide-svelte';

    import { goto } from '$app/navigation';
    import { pathTo } from '$lib/config';
    import { showDialog } from '$lib/domain/dialog';
    import { useLastViewedPages } from '$lib/hooks';

    const lastViewedPages = useLastViewedPages();
    const lastViewedPageSubtitle = $derived.by(() => {
        if (!$lastViewedPages.data?.length) {
            return;
        }

        const lastViewedPage = $lastViewedPages.data[0];
        if (!lastViewedPage.page) {
            return;
        }

        return `${lastViewedPage.page.name} · ${lastViewedPage.page?.book?.name}`;
    });

    const onNewBookClick = () => {
        showDialog('CREATE_BOOK');
    };

    const onOpenLastViewedPage = () => {
        if (!$lastViewedPages.data?.length) {
            return;
        }

        const lastViewedPage = $lastViewedPages.data[0];
        const book = lastViewedPage.page?.book_id;
        const page = lastViewedPage.page?.id;
        if (!book || !page) {
            return;
        }

        goto(pathTo('page', { book: `${book}`, page: `${page}` }));
    };

    const Actions = $derived([
        {
            icon: BookPlus,
            name: 'Add a new book',
            onClick: onNewBookClick,
            subtitle: 'Create a new empty book'
        },
        {
            icon: FilePlus,
            name: 'Add a new page',
            subtitle: 'Add a page to a new or existing book'
        },
        {
            disabled: !$lastViewedPages.data?.length,
            icon: FileClock,
            loading: $lastViewedPages.isLoading,
            name: 'Open last viewed page',
            onClick: onOpenLastViewedPage,
            subtitle: lastViewedPageSubtitle
        }
    ]);
</script>

<section class="flex flex-col gap-3 md:mb-4">
    <p class="text-sm font-semibold">Quick actions</p>
    <div class="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
        {#each Actions as { disabled, icon, loading, name, onClick, subtitle }}
            <button
                class="group flex w-full flex-col gap-3 rounded-lg border border-surface-200 bg-white p-3 text-left transition-all duration-150 hover:border-primary-300 disabled:cursor-not-allowed disabled:hover:border-surface-200"
                disabled={disabled || loading}
                class:animate-pulse={loading}
                onclick={onClick}
            >
                <div class="flex w-full items-start justify-between">
                    <div
                        class="flex size-10 items-center justify-center rounded-lg bg-primary-500 p-2 group-disabled:bg-surface-200"
                    >
                        <svelte:component this={icon} class="stroke-white" strokeWidth={1.75} />
                    </div>
                    <Plus
                        class="size-4 stroke-surface-700 transition-all group-hover:rotate-90 group-hover:stroke-primary group-disabled:rotate-0 group-disabled:stroke-surface-700"
                    />
                </div>
                <div class="flex w-full flex-col items-start gap-0.5">
                    <span class="text-sm font-semibold group-disabled:text-surface-700">{name}</span
                    >
                    {#if subtitle}
                        <span class="text-xs italic text-surface-700">{subtitle}</span>
                    {/if}
                </div>
            </button>
        {/each}
    </div>
</section>
