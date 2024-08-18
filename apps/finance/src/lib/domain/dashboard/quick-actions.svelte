<script lang="ts">
    import { BookPlus, FilePlus, Pencil, Plus } from 'lucide-svelte';

    import { showDialog } from '$lib/domain/dialog';
    import { useLastViewedPages } from '$lib/hooks';

    const lastViewedPages = useLastViewedPages();

    const onNewBookClick = () => {
        showDialog('CREATE_BOOK');
    };

    const Actions = [
        { icon: BookPlus, name: 'Add a new book', onClick: onNewBookClick },
        { icon: FilePlus, name: 'Add a new page' },
        {
            disabled: !$lastViewedPages.data?.length,
            icon: Pencil,
            loading: $lastViewedPages.isLoading,
            name: 'Open last edited page'
        }
    ];
</script>

<section class="flex flex-col gap-3 md:mb-4">
    <p class="text-sm font-semibold">Quick actions</p>
    <div class="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
        {#each Actions as { disabled, icon, loading, name, onClick }}
            <button
                class="group flex w-full flex-col gap-3 rounded-lg border border-surface-200 bg-white p-3 transition-all duration-150 hover:border-primary-300 disabled:cursor-not-allowed disabled:hover:border-surface-200"
                disabled={disabled || loading}
                class:animate-pulse={loading}
                onclick={onClick}
            >
                <div class="flex w-full items-start justify-between">
                    <div
                        class="flex size-10 items-center justify-center rounded-lg bg-primary-500 p-2 group-disabled:bg-surface-200"
                    >
                        <svelte:component this={icon} class="stroke-white" />
                    </div>
                    <Plus
                        class="size-4 stroke-surface-700 transition-all group-hover:rotate-90 group-hover:stroke-primary group-disabled:rotate-0 group-disabled:stroke-surface-700"
                    />
                </div>
                <span class="text-sm font-semibold group-disabled:text-surface-700">{name}</span>
            </button>
        {/each}
    </div>
</section>
