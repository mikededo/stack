<script lang="ts">
    import { clickAway } from '@stack/actions';
    import { getUserDataContext } from '@stack/supabase';
    import { Button } from '@stack/ui';

    import type { BooksWithPages } from '$lib/db';

    import { FilePlus } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import { useCreatePage } from './hooks';
    import ListHeader from './list-header.svelte';
    import NewPageItem from './new-page-item.svelte';
    import PageItem from './page-item.svelte';

    type Props = { book: BooksWithPages[number] };
    const { book }: Props = $props();

    const newPageMutation = useCreatePage();
    const user = getUserDataContext();
    let newPage = $state(false);
    let pageName = $state('');

    const onAddPage = () => {
        newPage = true;
    };

    const onConfirmNewPage = () => {
        $newPageMutation.mutate(
            { book: book.id, name: pageName },
            {
                onSettled: () => {
                    newPage = false;
                    pageName = '';
                }
            }
        );
    };

    const onCancelNewPage = () => {
        newPage = false;
    };
</script>

<section use:clickAway={onCancelNewPage}>
    <ul>
        <ListHeader />
        {#each book.page as page (page.id)}
            <PageItem isShared={page.created_by !== user.id} owner={user.first_name[0]} {page}>
                {#snippet name()}
                    <span>{page.name}</span>
                {/snippet}
            </PageItem>
        {/each}
        {#if newPage}
            <NewPageItem
                bind:value={pageName}
                onCancel={onCancelNewPage}
                onConfirm={onConfirmNewPage}
            />
        {/if}
    </ul>
    <div class="flex items-center gap-2 py-2">
        <Button
            class="flex cursor-pointer items-center gap-2 px-3 py-2 transition-colors"
            color="muted"
            disabled={newPage}
            onclick={onAddPage}
        >
            <FilePlus class="size-4" strokeWidth={2.5} />
            <span>Add a new page</span>
        </Button>
        {#if newPage}
            <div transition:fade={{ duration: 100 }}>
                <Button
                    class="flex cursor-pointer items-center gap-2 px-3 py-2 transition-colors"
                    color="primary"
                    disabled={!pageName}
                    onclick={onConfirmNewPage}
                >
                    Save page
                </Button>
            </div>
        {/if}
    </div>
</section>
