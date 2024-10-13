<script lang="ts">
    import { fade } from 'svelte/transition';

    import { BookAccordion, BookAccordionSkeleton, EmptyBookState } from '$lib/domain/books';
    import { LastViewedPages, QuickActions } from '$lib/domain/dashboard';
    import { CreateBookDialog } from '$lib/domain/dialog';
    import { PinnedPages } from '$lib/domain/page';
    import { useBooks } from '$lib/hooks';

    const booksQuery = useBooks();
</script>

<svelte:head>
    <title>Expenses | Finances · Stack</title>
    <meta content="Welcome to your finances!" name="description" />
    <meta content="#ffffff" name="theme-color" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta content="Financed · stack" name="apple-mobile-web-app-title" />
    <meta content="Financed · stack" name="application-name" />
    <meta content="Expenses | Finances · stack" property="og:title" />
    <meta content="Welcome to your finances!" property="og:description" />
</svelte:head>

<h1 class="md:mb-4">Dashboard</h1>

<QuickActions />
<LastViewedPages />
<PinnedPages />
<section class="flex h-full flex-col gap-3">
    <h2 class="text-2xl">Your books</h2>
    {#if $booksQuery.isLoading}
        <div transition:fade={{ duration: 100 }}>
            <BookAccordionSkeleton />
        </div>
    {:else if $booksQuery.data?.length}
        <div transition:fade={{ delay: 100, duration: 100 }}>
            <BookAccordion books={$booksQuery.data} />
        </div>
    {:else if !$booksQuery.isError}
        <EmptyBookState />
    {/if}
</section>

<CreateBookDialog />
