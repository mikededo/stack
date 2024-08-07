<script lang="ts">
    import type { Page } from '$lib/db';

    import NewEntry from './new-entry.svelte';
    import { tableState } from './state.svelte';
    import PageTableHead from './table-head.svelte';
    import PageTableOptions from './table-options.svelte';
    import TableRow from './table-row.svelte';

    type Props = { page: Page };
    let { page }: Props = $props();
    let expenses = $derived(page.expenses);
</script>

<PageTableOptions book={page.book_id} />

<table class="relative -mx-6 flex max-h-[72vh] flex-col overflow-auto md:mx-0 md:max-h-[50vh]">
    <PageTableHead />

    <tbody class="text-left text-sm">
        {#each page.expenses as expense, i (expense.id)}
            {#if tableState.newRowIndex === i}
                <NewEntry {expenses} />
            {/if}
            <TableRow position={i} {expense} {expenses} />
        {/each}
        <NewEntry {expenses} disableAutofocus />
    </tbody>
</table>
