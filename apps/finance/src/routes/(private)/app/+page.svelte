<script lang="ts">
    import { fade } from 'svelte/transition';

    import { BookAccordion, BookAccordionSkeleton } from '$lib/domain/books';
    import { LastViewedPages, QuickActions } from '$lib/domain/dashboard';
    import { PinnedPages } from '$lib/domain/page';
    import { useBooks } from '$lib/hooks';

    import type { PageData } from './$types';

    type Props = { data: PageData };
    let { data }: Props = $props();

    const booksQuery = useBooks(data.supabase);
</script>

<svelte:head>
    <title>Expenses | Finances · MStack</title>
    <meta content="Welcome to your finances!" name="description" />
    <meta content="#ffffff" name="theme-color" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta content="Financed · MStack" name="apple-mobile-web-app-title" />
    <meta content="Financed · MStack" name="application-name" />
    <meta content="Expenses | Finances · MStack" property="og:title" />
    <meta content="Welcome to your finances!" property="og:description" />
</svelte:head>

<h1 class="md:mb-4">Dashboard</h1>

<QuickActions />
<LastViewedPages />
<PinnedPages />
<section class="flex h-full flex-col gap-3">
    <h2 class="text-2xl">Your books</h2>
    <div>
        <!-- <BookAccordionSkeleton /> -->
        {#if $booksQuery.isLoading}
            <div transition:fade={{ duration: 100 }}>
                <BookAccordionSkeleton />
            </div>
        {:else if $booksQuery.data}
            <div transition:fade={{ delay: 100, duration: 100 }}>
                <BookAccordion books={$booksQuery.data} />
            </div>
        {/if}
    </div>
</section>
