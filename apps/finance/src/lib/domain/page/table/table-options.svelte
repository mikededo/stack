<script lang="ts">
    import { getSupabaseClient } from '@mstack/svelte-supabase';
    import { Input, Menu, MenuOption } from '@mstack/ui';

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

    type Props = { book: number };
    let { book }: Props = $props();
    const supabase = getSupabaseClient();

    const tagsQuery = useBookTags(supabase, `${book}`);

    const getTagClasses = (active?: boolean) =>
        `text-[var(--tag-color)] hover:bg-[var(--tag-color-hover)] active:bg-[var(--tag-color-hover)] ${
            active ? 'bg-transparent' : ''
        }`;
</script>

{#snippet filterContent()}
    <MenuOption Icon={TrendingUp} label="Amount (Ascending)" onClick={console.log} />
    <MenuOption Icon={TrendingDown} label="Amount (Descending)" onClick={console.log} />
    <MenuOption Icon={CalendarArrowUp} label="Date (Asc)" onClick={console.log} />
    <MenuOption Icon={CalendarArrowDown} label="Date (Desc)" onClick={console.log} />
{/snippet}

{#snippet tagsContent()}
    {#if $tagsQuery.data}
        {#each $tagsQuery.data as tag (tag.id)}
            <button
                class="w-full"
                style="--tag-color: {tag.color}; --tag-color-hover: {tag.color}22;"
            >
                <MenuOption
                    class={getTagClasses(tag.id % 2 === 0)}
                    Icon={tag.id % 2 === 0 ? CircleCheck : Circle}
                    label={tag.name}
                    onClick={console.log}
                />
            </button>
        {/each}
    {/if}
{/snippet}

<div class="flex flex-row items-center justify-end gap-0.5 md:gap-1">
    <Input
        class="mr-auto w-full max-w-96 text-sm"
        color="secondary"
        placeholder="Search comments or amounts"
    />
    <Menu Icon={ListFilter} label="Filter" wrapperClass="hidden lg:flex">
        {@render filterContent()}
    </Menu>
    <Menu Icon={ListFilter} wrapperClass="flex lg:hidden">
        {@render filterContent()}
    </Menu>
    <Menu Icon={Tag} label="Tags" wrapperClass="hidden lg:flex">
        {@render tagsContent()}
    </Menu>
    <Menu Icon={Tag} loading={$tagsQuery.isLoading} wrapperClass="flex lg:hidden">
        {@render tagsContent()}
    </Menu>
</div>
