<script lang="ts">
    import { Breadcrumbs, type Crumbs } from '@mstack/ui';

    import { Check, Loader2, SaveOff } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import { pathTo } from '$lib/config';
    import { initPageContext, PageTable, setContextPage } from '$lib/domain/page';
    import { useBookPages } from '$lib/hooks';

    import type { PageData } from './$types';

    type Props = { data: PageData };
    let { data }: Props = $props();

    const query = useBookPages(data.supabase, data.params.book, data.params.page);
    query.subscribe(({ data }) => {
        if (data) {
            setContextPage(data);
        }
    });

    const pageContext = initPageContext();

    let breadcrumbs = $derived.by<Crumbs | undefined>(() => {
        if (!$query.data || !$query.data.book) {
            return;
        }

        const book = $query.data.book.id.toString();
        return [
            { href: pathTo('app'), label: 'Dashboard' },
            {
                href: pathTo('book', { book }),
                label: $query.data.book?.name
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

            {#if pageContext.state.saveStatus !== null}
                <div
                    class="flex items-center gap-1 text-sm text-secondary-300"
                    transition:fade={{ duration: 100 }}
                >
                    {#if pageContext.state.saveStatus === 'saving'}
                        <Loader2 class="size-4 animate-spin" strokeWidth={2} />
                    {:else if pageContext.state.saveStatus === 'saved'}
                        <Check class="size-4" />
                    {:else if pageContext.state.saveStatus === 'unsaved'}
                        <SaveOff class="size-4" />
                    {/if}
                    <span>
                        {#if pageContext.state.saveStatus === 'saving'}
                            Saving changes...
                        {:else if pageContext.state.saveStatus === 'saved'}
                            Changes saved!
                        {:else if pageContext.state.saveStatus === 'unsaved'}
                            Unsaved changes!
                        {/if}
                    </span>
                </div>
            {/if}
        </div>
    </div>

    <PageTable page={$query.data} />
{/if}
