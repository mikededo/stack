<script lang="ts">
    import { CircleSlash2 } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import { clearPageFilters, getPageContext, updateGrid } from './context.svelte';
    import { DragRow, initDragContext } from './drag';
    import Entry from './entry.svelte';
    import { tableState } from './state.svelte';
    import PageTableHead from './table-head.svelte';
    import PageTableOptions from './table-options.svelte';
    import TableRow from './table-row.svelte';

    const ctx = getPageContext();
    initDragContext();

    let gridNode = $state<HTMLDivElement>();
    const filteredExpenses = $derived.by(() => {
        if (!ctx.page) {
            // TS check
            return [];
        }

        if (ctx.filters.tags.size === 0) {
            return ctx.page.expenses;
        }

        return ctx.page.expenses.filter((expense) => {
            if (expense.tags.length === 0) {
                return false;
            }

            return expense.tags.some(tag => ctx.filters.tags.has(tag.id));
        });
    });

    const onClickAway = () => {
        tableState.newRowIndex = null;
    };

    $effect(() => {
        // eslint-disable-next-line no-unused-expressions
        ctx.page?.expenses;
        if (!gridNode) {
            return;
        }

        updateGrid(gridNode);
    });
</script>

{#if ctx.page}
    <section class="flex h-full flex-col gap-4">
        <PageTableOptions book={ctx.page.book_id} />

        <div
            class="relative -mx-6 flex h-full max-h-[72vh] flex-col overflow-auto scrollbar-thin md:mx-0 md:max-h-[50vh]"
            bind:this={gridNode}
            role="grid"
        >
            <PageTableHead />

            {#if filteredExpenses.length}
                <div
                    class="text-left text-sm"
                    role="rowgroup"
                    in:fade={{ delay: 150, duration: 100 }}
                    out:fade={{ duration: 100 }}
                >
                    {#each filteredExpenses as expense, i (expense.id)}
                        {#if tableState.newRowIndex === i}
                            <Entry position={i} empty {onClickAway} />
                        {/if}
                        <TableRow position={i} {expense} />
                        {#if i === ctx.page.expenses.length - 1}
                            <!-- By having the new entry at the end of the list, we can ensure that this component -->
                            <!-- is always upadted, even after adding a new expense, ensuring the new entry -->
                            <!-- is autofocused -->
                            <Entry position={i + 1} empty />
                        {/if}
                    {/each}
                </div>
            {:else}
                <!-- TODO: Add a new empty entry -->
                <div
                    class="h-full w-full py-4"
                    role="presentation"
                    in:fade={{ delay: 150, duration: 100 }}
                    out:fade={{ duration: 100 }}
                >
                    <div
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
                    </div>
                </div>
            {/if}
        </div>
    </section>

    <DragRow shadow />
{/if}
