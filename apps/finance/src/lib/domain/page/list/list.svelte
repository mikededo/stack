<script lang="ts">
    import { getSupabaseClient, getUserDataContext } from '@mstack/svelte-supabase';
    import { Button } from '@mstack/ui';

    import { createMutation, useQueryClient } from '@tanstack/svelte-query';
    import { FilePlus } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import { Keys } from '$lib/config';
    import { type BooksWithPages, createPage, type NewPageData } from '$lib/db';

    import ListHeader from './list-header.svelte';
    import NewPageItem from './new-page-item.svelte';
    import PageItem from './page-item.svelte';

    type Props = { book: BooksWithPages[number] };
    let { book }: Props = $props();

    let queryClient = useQueryClient();
    let supabaseClient = getSupabaseClient();
    let user = getUserDataContext();
    let newPage = $state(false);

    let newPageMutation = createMutation({
        mutationFn: async (data: NewPageData) => await createPage(supabaseClient, data),
        onSuccess: (data) => {
            if (!data) {
                return;
            }

            queryClient.setQueryData<BooksWithPages>(Keys.BOOKS, (prevBooks) => {
                // TS check only
                if (!prevBooks) {
                    return prevBooks;
                }

                return prevBooks.map((book) => {
                    if (book.id !== book.id) {
                        return book;
                    }

                    return { ...book, page: [...book.page, data[0]] };
                });
            });
        }
    });

    const handleOnAddPage = () => {
        newPage = true;
    };

    const handleOnConfirmNewPage = (pageName: string) => {
        $newPageMutation.mutate(
            { book: book.id, name: pageName },
            {
                onSettled: () => {
                    newPage = false;
                }
            }
        );
    };

    const handleOnCancelNewPage = () => {
        newPage = false;
    };
</script>

<ul>
    <ListHeader />
    {#each book.page as page (page.id)}
        <PageItem
            createdAt={new Date(page.created_at)}
            href={`/app/${book.id}/${page.id}`}
            isShared={page.created_by !== user.id}
            owner={user.first_name[0]}
        >
            {#snippet name()}
                <span>{page.name}</span>
            {/snippet}
        </PageItem>
    {/each}
    {#if newPage}
        <NewPageItem onCancel={handleOnCancelNewPage} onConfirm={handleOnConfirmNewPage} />
    {/if}
</ul>
<div class="flex items-center gap-2 py-2">
    <Button
        class="flex cursor-pointer items-center gap-2 px-3 py-2 transition-colors"
        color="muted"
        disabled={newPage}
        onclick={handleOnAddPage}
    >
        <FilePlus class="size-4" strokeWidth={2.5} />
        <span>Add a new page</span>
    </Button>
    {#if newPage}
        <div transition:fade={{ duration: 100 }}>
            <Button
                class="flex cursor-pointer items-center gap-2 px-3 py-2 transition-colors"
                color="primary"
            >
                Save page
            </Button>
        </div>
    {/if}
</div>
