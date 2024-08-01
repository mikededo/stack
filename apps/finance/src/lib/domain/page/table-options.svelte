<script lang="ts">
    import { IconButton, Input, Menu, MenuOption } from '@mstack/ui';

    import {
        CalendarArrowDown,
        CalendarArrowUp,
        ListFilter,
        Tag,
        TrendingDown,
        TrendingUp
    } from 'lucide-svelte';
</script>

{#snippet filterContent()}
    <MenuOption Icon={TrendingUp} label="Amount (Ascending)" onClick={console.log} />
    <MenuOption Icon={TrendingDown} label="Amount (Descending)" onClick={console.log} />
    <MenuOption Icon={CalendarArrowUp} label="Date (Asc)" onClick={console.log} active />
    <MenuOption Icon={CalendarArrowDown} label="Date (Desc)" onClick={console.log} />
{/snippet}

{#snippet tagsContent()}
    <MenuOption label="Tag 1" onClick={console.log} />
    <MenuOption label="Tag 2" onClick={console.log} />
    <MenuOption label="Tag 3" onClick={console.log} />
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
    <Menu class="flex lg:hidden" Icon={Tag}>
        {@render tagsContent()}
    </Menu>
</div>
