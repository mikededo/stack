<script lang="ts">
    import { Breadcrumbs, type Crumbs } from '@mstack/ui';

    import { Loader2 } from 'lucide-svelte';

    import { pathTo } from '$lib/config';
    import { PageTable } from '$lib/domain/page/table';
    import { useBookPages } from '$lib/hooks';

    import type { PageData } from './$types';

    type Props = { data: PageData };
    let { data }: Props = $props();

    const query = useBookPages(data.supabase, data.params.book, data.params.page);

    let breadcrumbs = $derived.by<Crumbs | undefined>(() => {
        if (!$query.data || !$query.data.book) {
            return;
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
        <div class="flex flex-row items-center justify-between">
            {#if breadcrumbs}
                <Breadcrumbs {breadcrumbs} />
            {/if}
            <!-- TODO: Add global table state -->
            <div class="flex items-center gap-1 text-sm text-secondary-200">
                <Loader2 strokeWidth={2} class="size-4 animate-spin" />
                <span>Saving changes...</span>
            </div>
        </div>
    </div>

    <PageTable page={$query.data} />
{/if}
