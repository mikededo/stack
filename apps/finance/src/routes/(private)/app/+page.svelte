<script lang="ts">
    import { createQuery } from '@tanstack/svelte-query';

    import { Keys } from '$lib/config';
    import { getBooksWithPages } from '$lib/db';
    import { BookAccordion } from '$lib/domain/books';

    import type { PageData } from './$types';

    type Props = { data: PageData };
    let { data }: Props = $props();

    let query = createQuery({
        queryKey: Keys.BOOKS,
        queryFn: () => getBooksWithPages(data.supabase)
    });
</script>

<svelte:head>
    <title>Expenses | Finances · MStack</title>
    <meta name="description" content="Welcome to your finances!" />
    <meta name="theme-color" content="#ffffff" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="apple-mobile-web-app-title" content="Financed · MStack" />
    <meta name="application-name" content="Financed · MStack" />
    <meta property="og:title" content="Expenses | Finances · MStack" />
    <meta property="og:description" content="Welcome to your finances!" />
</svelte:head>

<h1>Dashboard</h1>
{#if $query.isLoading}
    <p>Loading...</p>
{:else if $query.data}
    <section class="md:mt-8">
        <BookAccordion books={$query.data} />
    </section>
{/if}
