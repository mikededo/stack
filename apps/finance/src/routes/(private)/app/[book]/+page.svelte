<script lang="ts">
    import { Breadcrumbs, type Crumbs } from '@mstack/ui';

    import { createQuery } from '@tanstack/svelte-query';

    import { Keys, pathTo } from '$lib/config';
    import { getBook } from '$lib/db';
    import { BookAccordionPages } from '$lib/domain/books';

    import type { PageData } from './$types';

    type Props = { data: PageData };
    let { data }: Props = $props();

    let query = createQuery({
        queryKey: Keys.BOOK(data.params.book),
        queryFn: () => getBook(data.supabase, data.params.book)
    });
    let breadcrumbs = $derived.by<Crumbs | undefined>(() => {
        if (!$query.data) {
            return;
        }

        return [{ label: 'Dashboard', href: pathTo('app') }, { label: $query.data.name }];
    });
</script>

{#if $query.isLoading}
    <div class="flex h-full w-full items-center justify-center">
        <div class="flex h-full w-full items-center justify-center">Loading...</div>
    </div>
{:else if $query.data}
    <div class="flex flex-col gap-2">
        <h1>{$query.data.name}</h1>
        {#if breadcrumbs}
            <Breadcrumbs {breadcrumbs} />
        {/if}
    </div>
    <ul class="border-b border-secondary-100 last:border-0">
        <BookAccordionPages book={$query.data} />
    </ul>
{/if}
