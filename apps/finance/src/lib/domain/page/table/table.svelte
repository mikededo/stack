<script lang="ts">
    import { CircleSlash2 } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import type { Page } from '$lib/db';

    import { clearPageFilters, getPageContext } from './context.svelte';
    import NewEntry from './new-entry.svelte';
    import { tableState } from './state.svelte';
    import PageTableHead from './table-head.svelte';
    import PageTableOptions from './table-options.svelte';
    import TableRow from './table-row.svelte';

    type Props = { page: Page };
    let { page }: Props = $props();

    const ctx = getPageContext();

    const filteredExpenses = $derived.by(() => {
        if (ctx.filters.tags.size === 0) {
            return page.expenses;
        }

        return page.expenses.filter((expense) => {
            if (expense.tags.length === 0) {
                return false;
            }

            return expense.tags.some((tag) => ctx.filters.tags.has(tag.id));
        });
    });

    const onClickAway = () => {
        tableState.newRowIndex = null;
    };
</script>

<section class="flex h-full flex-col gap-4">
    <PageTableOptions book={page.book_id} />

    <table
        class="relative -mx-6 flex h-full max-h-[72vh] flex-col overflow-auto scrollbar-thin md:mx-0 md:max-h-[50vh]"
    >
        <PageTableHead />

        {#if filteredExpenses.length}
            <tbody
                class="text-left text-sm"
                in:fade={{ delay: 150, duration: 100 }}
                out:fade={{ duration: 100 }}
            >
                {#each filteredExpenses as expense, i (expense.id)}
                    {#if tableState.newRowIndex === i}
                        <NewEntry forceFocus="date" {onClickAway} />
                    {/if}
                    <TableRow position={i} {expense} />
                    {#if i === page.expenses.length - 1}
                        <!-- By having the new entry at the end of the list, we can ensure that this component -->
                        <!-- is always upadted, even after adding a new expense, ensuring the new entry -->
                        <!-- is autofocused -->
                        <NewEntry forceFocus="date" />
                    {/if}
                {/each}
                {#if page.expenses.length === 0}
                    <NewEntry forceFocus="date" />
                {/if}
            </tbody>
        {:else}
            <tbody
                class="h-full w-full py-4"
                in:fade={{ delay: 150, duration: 100 }}
                out:fade={{ duration: 100 }}
            >
                <tr class="flex h-full w-full">
                    <td
                        class="flex h-full w-full items-center justify-center gap-8 rounded-md bg-surface-50"
                    >
                        <CircleSlash2 class="size-10 text-surface-900" strokeWidth={2.5} />
                        <div class="flex flex-col items-start">
                            <h2 class="text-center text-lg font-semibold text-surface-900">
                                No expenses found
                            </h2>
                            <p class="text-sm text-surface-700">
                                Try updating the filters or
                                <button
                                    class="underline outline-none hover:text-surface-900"
                                    onclick={clearPageFilters}
                                >
                                    clearing them
                                </button>!
                            </p>
                        </div>
                    </td>
                </tr>
            </tbody>
        {/if}
    </table>
</section>
