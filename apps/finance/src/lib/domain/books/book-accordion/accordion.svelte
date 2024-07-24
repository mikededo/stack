<script lang="ts">
    import { Book, ChevronDown } from 'lucide-svelte';
    import { slide } from 'svelte/transition';

    import type { BooksWithPages } from '$lib/db';

    import BookAccordionPages from './accordion-pages.svelte';

    type Props = { books: BooksWithPages };
    let { books }: Props = $props();

    let openedBooks = $state<Set<number>>(new Set());

    const handleOnToggleBook = (bookId: number) => () => {
        if (openedBooks.has(bookId)) {
            openedBooks.delete(bookId);
        } else {
            openedBooks.add(bookId);
        }

        openedBooks = new Set(openedBooks);
    };
</script>

{#each books as book, i (i)}
    <button
        class="flex w-full cursor-pointer items-center justify-between border-b border-secondary-100 px-3 py-2 transition-colors last-of-type:border-0 hover:bg-secondary-100/50 active:bg-secondary-100"
        class:bg-secondary-50={i % 2 === 1}
        onclick={handleOnToggleBook(book.id)}
        aria-current={openedBooks.has(book.id)}
    >
        <div class="flex items-center gap-2">
            <Book class="size-4" strokeWidth={2.5} />
            <span>{book.name}</span>
        </div>
        {#if book.page.length}
            <div class="rotate-0 transition-transform" class:rotate-180={openedBooks.has(book.id)}>
                <ChevronDown class="size-4" />
            </div>
        {/if}
    </button>
    {#if openedBooks.has(book.id)}
        <ul
            transition:slide={{ duration: 200 }}
            class="border-b border-secondary-100 pl-4 last:border-0"
        >
            <BookAccordionPages {book} />
        </ul>
    {/if}
{/each}
