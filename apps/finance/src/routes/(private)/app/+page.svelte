<script lang="ts">
    import { BookAccordion } from '$lib/domain/books';
    import { useBooks } from '$lib/hooks';

    import type { PageData } from './$types';

    type Props = { data: PageData };
    let { data }: Props = $props();

    const query = useBooks(data.supabase);
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

<h1>Dashboard</h1>
{#if $query.isLoading}
    <p>Loading...</p>
{:else if $query.data}
    <section class="md:mt-8">
        <BookAccordion books={$query.data} />
    </section>
{/if}
