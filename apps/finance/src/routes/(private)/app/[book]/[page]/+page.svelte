<script lang="ts">
    import { Breadcrumbs, type Crumbs } from '@stack/ui';

    import { Check, Loader2, SaveOff } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import { afterNavigate } from '$app/navigation';
    import { pathTo } from '$lib/config';
    import { BarChart, PieChart } from '$lib/domain/chart';
    import { initPageContext, PageTable, setContextPage } from '$lib/domain/page';
    import { useBookPages, useTrackViewedPage } from '$lib/hooks';

    import type { PageData } from './$types';

    type Props = { data: PageData };
    let { data }: Props = $props();

    const trackPageView = useTrackViewedPage();
    const query = useBookPages(data.params.book, data.params.page);
    let doughnutData = $state<{ data: number[]; labels: string[] }>({ data: [], labels: [] });
    let dailyData = $state<{ data: number[]; labels: string[] }>({ data: [], labels: [] });
    query.subscribe(({ data }) => {
        if (data) {
            setContextPage(data);

            const tagToExpense = new Map<string, number>();
            const dailyToExpense = new Map<string, number>();
            data.expenses.forEach((expense) => {
                if (expense.date) {
                    let agg = dailyToExpense.get(expense.date!);
                    if (!agg) {
                        dailyToExpense.set(expense.date!, expense.amount!);
                    } else {
                        dailyToExpense.set(expense.date!, agg + expense.amount!);
                    }
                }

                if (expense.tags.length === 0 || !expense.amount) {
                    return;
                }
                expense.tags.forEach((tag) => {
                    let agg = tagToExpense.get(expense.tags[0].name);
                    if (!agg) {
                        tagToExpense.set(tag.name, expense.amount!);
                    } else {
                        tagToExpense.set(tag.name, agg + expense.amount!);
                    }
                });
            });

            doughnutData = { data: [...tagToExpense.values()], labels: [...tagToExpense.keys()] };
            dailyData = { data: [...dailyToExpense.values()], labels: [...dailyToExpense.keys()] };
        }
    });

    const pageContext = initPageContext();

    let breadcrumbs = $derived.by<Crumbs | undefined>(() => {
        if (!$query.data || !$query.data.book) {
            return;
        }

        const book = $query.data.book.id.toString();
        return [
            { href: pathTo('app'), label: 'Dashboard' },
            {
                href: pathTo('book', { book }),
                label: $query.data.book?.name
            },
            { label: $query.data.name }
        ];
    });

    afterNavigate(({ to }) => {
        // Track only when entering the page
        if (to?.url.pathname === pathTo('page', data.params)) {
            $trackPageView.mutate(Number(data.params.page));
        }
    });
</script>

<svelte:head>
    {#if $query.isLoading}
        <title>Loading page...</title>
    {:else if $query.data}
        <title>Editing: {$query.data.name} · {$query.data.book?.name}</title>
    {/if}
</svelte:head>

{#if $query.isLoading}
    <div class="flex h-full w-full items-center justify-center">
        <div class="flex h-full w-full items-center justify-center">Loading...</div>
    </div>
{:else if $query.data}
    <div class="flex flex-col gap-2">
        <h1>{$query.data.name}</h1>
        <div class="flex flex-row items-center justify-between">
            {#if breadcrumbs}
                <Breadcrumbs {breadcrumbs} />
            {/if}

            {#if pageContext.saveStatus !== null}
                <div
                    class="flex items-center gap-1 text-sm text-surface-700"
                    transition:fade={{ duration: 100 }}
                >
                    {#if pageContext.saveStatus === 'saving'}
                        <Loader2 class="size-4 animate-spin" strokeWidth={2} />
                    {:else if pageContext.saveStatus === 'saved'}
                        <Check class="size-4" />
                    {:else if pageContext.saveStatus === 'unsaved'}
                        <SaveOff class="size-4" />
                    {/if}
                    <span>
                        {#if pageContext.saveStatus === 'saving'}
                            Saving changes...
                        {:else if pageContext.saveStatus === 'saved'}
                            Changes saved!
                        {:else if pageContext.saveStatus === 'unsaved'}
                            Unsaved changes!
                        {/if}
                    </span>
                </div>
            {/if}
        </div>
    </div>

    <PageTable page={$query.data} />
{/if}

<h2 class="mb-4 mt-8">Data display</h2>
<div class="grid grid-cols-1 gap-x-0 gap-y-8 md:gap-4 xl:grid-cols-3 xl:gap-16">
    <div class="flex flex-col gap-4 lg:gap-8">
        <h3 class="text-xl">Expenses by tags</h3>
        <div class="mx-auto w-full md:w-1/2 lg:w-3/4 xl:mx-0 xl:w-full">
            <PieChart data={doughnutData.data} labels={doughnutData.labels} />
        </div>
    </div>
    <div class="col-span-2 flex flex-col gap-4">
        <h3 class="text-xl">Expenses by day</h3>
        <BarChart data={dailyData.data} labels={dailyData.labels} />
    </div>
</div>
