<script lang="ts">
    import { Pin } from 'lucide-svelte';

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

<h1 class="md:mb-4">Dashboard</h1>

<section class="flex flex-col gap-2 md:mb-4">
    <p class="text-sm">Pinned pages</p>
    <div class="flex gap-2">
        {#each { length: 5 } as _, i (i)}
            <div class="flex w-60 flex-col gap-1 rounded-lg border border-surface-200 bg-white p-3">
                <div class="flex items-center justify-between">
                    <p class="text-sm font-semibold">Book 1</p>
                    <Pin class="size-4 rotate-45  stroke-primary" strokeWidth={2} />
                </div>
                <span class="text-xs italic">Last updated yesterday</span>
            </div>
        {/each}
    </div>
</section>

<section class="flex h-full flex-col gap-4">
    <h2 class="text-2xl">Your books</h2>
    <div>
        {#if $query.isLoading}
            <p>Loading...</p>
        {:else if $query.data}
            <BookAccordion books={$query.data} />
        {/if}
    </div>
</section>
