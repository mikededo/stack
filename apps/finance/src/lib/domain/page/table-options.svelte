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
                style="--tag-color: {tag.color}; --tag-color-hover: {tag.color}22;"
                class="w-full"
            >
                <MenuOption
                    class={getTagClasses(tag.id % 2 === 0)}
                    label={tag.name}
                    Icon={tag.id % 2 === 0 ? CircleCheck : Circle}
                    onClick={console.log}
                />
            </button>
        {/each}
    {/if}
{/snippet}

<div class="flex flex-row items-center justify-end gap-0.5 md:gap-1">
    <Input
        placeholder="Search comments or amounts"
        color="secondary"
        class="mr-auto w-full max-w-96 text-sm"
    />
    <Menu class="hidden lg:flex" label="Filter" Icon={ListFilter}>
        {@render filterContent()}
    </Menu>
    <Menu class="flex lg:hidden" Icon={ListFilter}>
        {@render filterContent()}
    </Menu>
    <Menu class="hidden lg:flex" label="Tags" Icon={Tag}>
        {@render tagsContent()}
    </Menu>
    <Menu class="flex lg:hidden" Icon={Tag} loading={$tagsQuery.isLoading}>
        {@render tagsContent()}
    </Menu>
</div>
