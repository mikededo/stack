<script lang="ts">
    import { Breadcrumbs, type Crumbs, type Tab, Tabs } from '@stack/ui';

    import type { PageData } from './$types';

    import { File, Tag } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import { pathTo } from '$lib/config';
    import { initListContext, type ListState, PageList, PageListOptions } from '$lib/domain/page';
    import { TagList } from '$lib/domain/tags';
    import { useBook } from '$lib/hooks';

    type Props = { data: PageData };
    const { data }: Props = $props();

    const listState = initListContext();

    const query = useBook(data.params.book);
    const breadcrumbs = $derived.by<Crumbs | undefined>(() => {
        if (!$query.data) {
            return;
        }

        return [{ href: pathTo('app'), label: 'Dashboard' }, { label: $query.data.name }];
    });

    const onClickTab = (view: ListState['view']) => () => {
        listState.view = view;
    };

    const tabs = $derived<Tab[]>([
        { Icon: File, name: 'Page list', onClick: onClickTab('pages') },
        { Icon: Tag, name: 'Tag list', onClick: onClickTab('tags') }
    ]);
</script>

<svelte:head>
    {#if $query.isLoading}
        <title>Loading book...</title>
    {:else if $query.data}
        <title>Book: {$query.data.name}</title>
    {/if}
</svelte:head>

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

    <section class="flex h-full flex-col gap-4">
        <PageListOptions>
            <Tabs {tabs} />
        </PageListOptions>
        {#if listState.view === 'pages'}
            <div in:fade={{ delay: 100, duration: 100 }} out:fade={{ duration: 100 }}>
                <PageList book={$query.data} />
            </div>
        {:else}
            <div in:fade={{ delay: 100, duration: 100 }} out:fade={{ duration: 100 }}>
                <TagList book={$query.data} />
            </div>
        {/if}
    </section>
{/if}
