<script lang="ts">
    import { Breadcrumbs, type Crumbs, TextIconButton } from '@mstack/ui';

    import { File, Tag } from 'lucide-svelte';

    import { pathTo } from '$lib/config';
    import { PageList, PageListOptions, initListContext } from '$lib/domain/page';
    import { TagList } from '$lib/domain/tags';
    import { useBook } from '$lib/hooks';

    import type { PageData } from './$types';

    type Props = { data: PageData };
    let { data }: Props = $props();

    let listState = initListContext();

    let query = useBook(data.supabase, data.params.book);
    let breadcrumbs = $derived.by<Crumbs | undefined>(() => {
        if (!$query.data) {
            return;
        }

        return [{ label: 'Dashboard', href: pathTo('app') }, { label: $query.data.name }];
    });

    let buttonProps = $derived(
        listState.view === 'pages'
            ? { label: 'Edit tags', Icon: Tag }
            : { label: 'See pages', Icon: File }
    );

    const onToggleView = () => {
        listState.view = listState.view === 'pages' ? 'tags' : 'pages';
    };
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

    <PageListOptions>
        <TextIconButton {...buttonProps} color="secondary" onclick={onToggleView} />
    </PageListOptions>
    <section>
        {#if listState.view === 'pages'}
            <PageList book={$query.data} />
        {:else}
            <TagList book={$query.data} />
        {/if}
    </section>
{/if}
