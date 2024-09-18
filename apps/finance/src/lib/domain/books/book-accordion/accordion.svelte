<script lang="ts">
    import type { BooksWithPages } from '$lib/db';

    import { Book, ChevronDown } from 'lucide-svelte';
    import { slide } from 'svelte/transition';

    import { PageList } from '$lib/domain/page';

    type Props = { books: BooksWithPages };
    let { books }: Props = $props();

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

{#each books as book, i (book.id)}
    <button
        class="flex w-full cursor-pointer items-center justify-between border-b border-primary-100 px-3 py-2 transition-colors hover:bg-primary-100 active:bg-primary-100"
        aria-current={openedBooks.has(book.id)}
        class:bg-primary-50={i % 2 === 0}
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
{/each}
