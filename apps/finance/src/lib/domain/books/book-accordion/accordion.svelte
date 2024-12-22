<script lang="ts">
    import type { BooksWithPages } from '$lib/db';

    import { PageList } from '$lib/domain/page';
    import { Book, ChevronDown } from 'lucide-svelte';
    import { slide } from 'svelte/transition';

    type Props = { books: BooksWithPages };
    const { books }: Props = $props();

    let openedBooks = $state<Set<number>>(new Set());

    const onToggleBook = (bookId: number) => () => {
        if (openedBooks.has(bookId)) {
            openedBooks.delete(bookId);
        } else {
            openedBooks.add(bookId);
        }

        openedBooks = new Set(openedBooks);
    };
</script>

{#each books as book (book.id)}
    <div
        class="first:border border-x last:border-b first:rounded-t-md overflow-hidden last:rounded-b-md"
        class:last:border-t-0={books.length > 1}
    >
        <button
            class="flex w-full cursor-pointer items-center justify-between px-4 py-2 transition-colors"
            aria-current={openedBooks.has(book.id)}
            onclick={onToggleBook(book.id)}
        >
            <div class="flex items-center gap-2">
                <Book class="size-4" strokeWidth={2.5} />
                <span>{book.name}</span>
            </div>
            <div class="rotate-0 transition-transform" class:rotate-180={openedBooks.has(book.id)}>
                <ChevronDown class="size-4" />
            </div>
        </button>
        {#if openedBooks.has(book.id)}
            <div class="pl-4" transition:slide={{ duration: 200 }}>
                <PageList {book} />
            </div>
        {/if}
    </div>
{/each}
