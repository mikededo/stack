<script lang="ts">
    import type { Page } from '$lib/db';

    import PageTableHead from './table-head.svelte';
    import PageTableOptions from './table-options.svelte';

    type Props = { page: Page };
    let { page }: Props = $props();
</script>

<PageTableOptions />

<table class="relative -mx-6 flex flex-col overflow-auto md:mx-0">
    <PageTableHead />

    <tbody class="pb-4 text-left text-sm">
        {#each page.expenses as expense (expense.id)}
            <tr class="flex w-full items-stretch">
                <td class="w-32 shrink-0 border-b border-secondary-100 p-3">
                    {expense.date ? new Date(expense.date).toLocaleDateString() : ''}
                </td>
                <td class="w-32 shrink-0 border-b border-secondary-100 p-3">
                    &euro; {expense.amount}
                </td>
                <td class="w-full min-w-64 border-b border-secondary-100 p-3">
                    {expense.comment}
                    {expense.comment}
                </td>
                <td class="border-b border-secondary-100 p-3 sm:min-w-24 md:min-w-40">
                    {#each expense.tags as tag (tag.id)}
                        <span
                            class="rounded-full px-2 py-1 text-xs font-semibold"
                            style="background-color: {tag.color}44; color: {tag.color}"
                        >
                            {tag.name}
                        </span>
                    {/each}
                </td>
            </tr>
        {/each}
    </tbody>
</table>
