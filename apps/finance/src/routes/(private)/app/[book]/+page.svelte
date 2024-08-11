<script lang="ts">
    import { Breadcrumbs, Button, type Crumbs, TextIconButton } from '@mstack/ui';

    import { File, Tag } from 'lucide-svelte';

    import { pathTo } from '$lib/config';
    import { initListContext, PageList, PageListOptions } from '$lib/domain/page';
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

        return [{ href: pathTo('app'), label: 'Dashboard' }, { label: $query.data.name }];
    });

    let buttonProps = $derived(
        listState.view === 'pages'
            ? { Icon: Tag, label: 'Edit tags' }
            : { Icon: File, label: 'See pages' }
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

    <section class="flex h-full flex-col gap-4">
        <PageListOptions>
            <TextIconButton
                class="hidden md:flex"
                {...buttonProps}
                color="secondary"
                onclick={onToggleView}
            />
            <Button class="block h-10 md:hidden" color="secondary" onclick={onToggleView}>
                <svelte:component this={buttonProps.Icon} class="size-4" />
            </Button>
        </PageListOptions>
        <div>
            {#if listState.view === 'pages'}
                <PageList book={$query.data} />
            {:else}
                <TagList book={$query.data} />
            {/if}
        </div>
    </section>
{/if}
