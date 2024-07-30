<script lang="ts">
    import type { Page } from '$lib/db';

    type Props = { page: Page };
    let { page }: Props = $props();
</script>

<table class="relative -mx-6 flex flex-col overflow-auto md:mx-0">
    <thead class="sticky top-0">
        <tr class="flex w-full text-left text-sm text-secondary-500">
            <th
                class="w-32 shrink-0 border-b border-secondary-100 bg-secondary-50 py-1.5 pl-3 font-semibold"
            >
                Date
            </th>
            <th
                class="w-32 shrink-0 border-b border-secondary-100 bg-secondary-50 py-1.5 pl-3 font-semibold"
            >
                Amount
            </th>
            <th
                class="w-full min-w-64 border-b border-secondary-100 bg-secondary-50 py-1.5 pl-3 font-semibold"
            >
                Comment
            </th>
            <th
                class="border-b border-secondary-100 bg-secondary-50 py-1.5 pl-3 font-semibold sm:min-w-24 md:min-w-40"
            >
                Tags
            </th>
        </tr>
    </thead>
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
