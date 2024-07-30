<script lang="ts">
    import { createQuery } from '@tanstack/svelte-query';

    import { Keys, pathTo } from '$lib/config';
    import { getPage } from '$lib/db';

    import type { PageData } from './$types';

    type Props = { data: PageData };
    let { data }: Props = $props();

    let query = createQuery({
        queryKey: Keys.BOOK(data.params.page),
        queryFn: () => getPage(data.supabase, data.params.page)
    });
</script>

<svelte:head>
    {#if $query.data}
        <title>Editing: {$query.data.name} - {$query.data.book?.name}</title>
    {/if}
</svelte:head>

{#if $query.isLoading}
    <div class="flex h-full w-full items-center justify-center">
        <div class="flex h-full w-full items-center justify-center">Loading...</div>
    </div>
{:else if $query.data}
    <div class="flex flex-col gap-2">
        <h1>{$query.data.name}</h1>
        <nav aria-label="Breadcrumbs">
            <ol class="flex flex-row gap-1 text-sm text-secondary-300 duration-0">
                <li>
                    <a href="../.." class="transition-all hover:text-foreground hover:underline">
                        Dashboard
                    </a>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                    <a href="../" class="transition-all hover:text-foreground hover:underline">
                        {$query.data.book?.name}
                    </a>
                </li>
                <li aria-hidden="true">/</li>
                <li class="text-foreground" aria-current="page">
                    {$query.data.name}
                </li>
            </ol>
        </nav>
    </div>

    <table class="max-w-screen -mx-6 block overflow-x-auto overflow-y-hidden md:mx-0">
        <thead class="bg-secondary-50">
            <tr class="border-b border-secondary-100 text-left text-sm text-secondary-500">
                <th class="w-[12.5%] py-1.5 pl-3 font-semibold">Date</th>
                <th class="w-[12.5%] py-1.5 pl-3 font-semibold">Amount</th>
                <th class="w-full min-w-64 py-1.5 pl-3 font-semibold">Comment</th>
                <th class="py-1.5 pl-3 font-semibold sm:min-w-24 md:min-w-64">Tags</th>
            </tr>
        </thead>
        <tbody>
            {#each $query.data.expense as expense (expense.id)}
                <tr class="border-b border-secondary-100">
                    <td class="w-[12.5%] p-3">{new Date(expense.date).toLocaleDateString()}</td>
                    <td class="w-[12.5%] p-3">{expense.amount}&euro;</td>
                    <td class="w-full p-3">{expense.comment}</td>
                    <td class="min-w-[12.5%] p-3">
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
{/if}
