<script lang="ts">
    import type { Page } from '$lib/db';

    import NewEntry from './new-entry.svelte';
    import { tableState } from './state.svelte';
    import PageTableHead from './table-head.svelte';
    import PageTableOptions from './table-options.svelte';
    import TableRow from './table-row.svelte';

    type Props = { page: Page };
    let { page }: Props = $props();
</script>

<PageTableOptions book={page.book_id} />

<table class="relative -mx-6 flex flex-col overflow-auto md:mx-0">
    <PageTableHead />

    <tbody class="pb-4 text-left text-sm">
        {#each page.expenses as expense, i (expense.id)}
            {#if tableState.newRowIndex === i}
                <NewEntry />
            {/if}
            <TableRow position={i} {expense} />
        {/each}
    </tbody>
</table>
