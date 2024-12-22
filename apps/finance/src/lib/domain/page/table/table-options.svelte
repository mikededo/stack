<script lang="ts">
    import type { Sort } from './context.svelte';

    import { DotIndicator, Input, Menu, MenuOption } from '@stack/ui';
    import { TagMenuList } from '$lib/domain/tags';
    import { useBookTags } from '$lib/hooks';
    import {
        CalendarArrowDown,
        CalendarArrowUp,
        ListFilter,
        Tag,
        TrendingDown,
        TrendingUp
    } from 'lucide-svelte';

    import {
        areTagsActive,
        isSortActive,
        isTagActive,
        onClickSort,
        onToggleTag
    } from './context.svelte';

    type Props = { book: number };
    const { book }: Props = $props();

    const tagsQuery = useBookTags(`${book}`);

    const onClickSortWrapper = (sort: Sort) => () => {
        onClickSort(sort);
    };
</script>

{#snippet filterContent()}
    <MenuOption
        active={isSortActive('amount-asc')}
        Icon={TrendingUp}
        label="Amount (Ascending)"
        onClick={onClickSortWrapper('amount-asc')}
    />
    <MenuOption
        active={isSortActive('amount-desc')}
        Icon={TrendingDown}
        label="Amount (Descending)"
        onClick={onClickSortWrapper('amount-desc')}
    />
    <MenuOption
        active={isSortActive('date-asc')}
        Icon={CalendarArrowUp}
        label="Date (Asc)"
        onClick={onClickSortWrapper('date-asc')}
    />
    <MenuOption
        active={isSortActive('date-desc')}
        Icon={CalendarArrowDown}
        label="Date (Desc)"
        onClick={onClickSortWrapper('date-desc')}
    />
{/snippet}

<div class="flex flex-row items-center justify-end gap-2">
    <Input
        class="mr-auto w-full max-w-96 text-sm"
        color="surface"
        placeholder="Search comments or amounts"
    />
    <Menu Icon={ListFilter} label="Sort" wrapperClass="hidden lg:flex">
        {@render filterContent()}
    </Menu>
    <Menu Icon={ListFilter} wrapperClass="flex lg:hidden">
        {@render filterContent()}
    </Menu>
    <DotIndicator containerClass="hidden lg:flex" show={areTagsActive()}>
        <Menu Icon={Tag} label="Tags">
            <TagMenuList book={`${book}`} {isTagActive} onClick={onToggleTag} />
        </Menu>
    </DotIndicator>
    <DotIndicator containerClass="flex lg:hidden" show={areTagsActive()}>
        <Menu Icon={Tag} loading={$tagsQuery.isLoading}>
            <TagMenuList book={`${book}`} {isTagActive} onClick={onToggleTag} />
        </Menu>
    </DotIndicator>
</div>
