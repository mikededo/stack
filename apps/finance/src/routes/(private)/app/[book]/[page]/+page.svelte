<script lang="ts">
    import { Breadcrumbs, type Crumbs } from '@mstack/ui';

    import { createQuery } from '@tanstack/svelte-query';

    import { Keys, pathTo } from '$lib/config';
    import { getPage } from '$lib/db';
    import { PageTable } from '$lib/domain/page';

    import type { PageData } from './$types';

    type Props = { data: PageData };
    let { data }: Props = $props();

    let query = createQuery({
        queryKey: Keys.BOOK(data.params.page),
        queryFn: () => getPage(data.supabase, data.params.page)
    });
    let breadcrumbs = $derived.by<Crumbs>(() => {
        if (!$query.data || !$query.data.book) {
            return [];
        }

        const book = $query.data.book.id.toString();
        return [
            { label: 'Dashboard', href: pathTo('app') },
            {
                label: $query.data.book?.name,
                href: pathTo('book', { book })
            },
            { label: $query.data.name }
        ];
    });
</script>

<svelte:head>
    {#if $query.data}
        <title>Editing: {$query.data.name} - {$query.data.book?.name}</title>
    {/if}
</svelte:head>

{#if $query.isLoading}
    <div class="flex h-full w-full items-center justify-center">
        <div class="flex h-full w-full items-center justify-center">Loading...</div>
    </div>
{:else if $query.data}
    <div class="flex flex-col gap-2">
        <h1>{$query.data.name}</h1>
        <Breadcrumbs {breadcrumbs} />
    </div>

    <PageTable page={$query.data} />
{/if}
