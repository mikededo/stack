<script lang="ts">
    import { DotIndicator, Input, Menu, MenuOption } from '@stack/ui';

    import {
        CalendarArrowDown,
        CalendarArrowUp,
        Circle,
        CircleCheck,
        ListFilter,
        Tag,
        TrendingDown,
        TrendingUp
    } from 'lucide-svelte';

    import { useBookTags } from '$lib/hooks';

    import type { Sort } from './context.svelte';

    import {
        areTagsActive,
        getPageContext,
        isSortActive,
        isTagActive,
        onClickSort,
        onToggleTag
    } from './context.svelte';

    type Props = { book: number };
    let { book }: Props = $props();

    const ctx = getPageContext();
    const tagsQuery = useBookTags(`${book}`);

    const onToggleTagWrapper = (tag: number) => () => {
        onToggleTag(tag);
    };

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

{#snippet tagsContent()}
    {#if $tagsQuery.data}
        {#each $tagsQuery.data as tag (tag.id)}
            <div class="w-full" style="--tag-color: {tag.color}; --tag-color-hover: {tag.color}22;">
                <MenuOption
                    class="tag"
                    active={isTagActive(tag.id)}
                    Icon={isTagActive(tag.id) ? CircleCheck : Circle}
                    label={tag.name}
                    unstyled
                    onClick={onToggleTagWrapper(tag.id)}
                />
            </div>
        {/each}
    {/if}

    <style lang="postcss">
        .tag {
            color: var(--tag-color);

            &[aria-current='true'] {
                background-color: var(--tag-color-hover);
            }
        }
        .tag:hover {
            background-color: var(--tag-color-hover);
        }
    </style>
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
            {@render tagsContent()}
        </Menu>
    </DotIndicator>
    <DotIndicator containerClass="flex lg:hidden" show={areTagsActive()}>
        <Menu Icon={Tag} loading={$tagsQuery.isLoading}>
            {@render tagsContent()}
        </Menu>
    </DotIndicator>
</div>
