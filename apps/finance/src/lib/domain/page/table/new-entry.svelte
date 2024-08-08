<script lang="ts" context="module">
    export type ForceFocus = 'amount' | 'comment' | 'date' | null;
    type Props = {
        disableAutofocus?: boolean;
        expense?: Expense;
        forceFocus?: ForceFocus;
        onBlur?: () => void;
    };

    const parseDate = (date?: string | null) => {
        if (!date) {
            return '';
        }

        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    };
</script>

<script lang="ts">
    import { getSupabaseClient } from '@mstack/svelte-supabase';

    import { useQueryClient } from '@tanstack/svelte-query';
    import type { Action } from 'svelte/action';

    import type { Expense } from '$lib/db';

    import {
        getPageBookId,
        getPageExpenses,
        getPageId,
        onInitLoading,
        onStopLoading
    } from './context.svelte';
    import { hasExpenseChanged, isExpenseValid } from './helpers';
    import { useExpenseMutation } from './hooks';
    import { Amount, Comment, Date } from './new-expense';

    let { disableAutofocus, expense, forceFocus, onBlur }: Props = $props();

    let supabase = getSupabaseClient();
    let queryClient = useQueryClient();
    let expenses = getPageExpenses();
    let page = getPageId();
    let amount = $state(`${expense?.amount ?? ''}`);
    let comment = $state(expense?.comment ?? '');
    let date = $state(parseDate(expense?.date));
    let expenseMutation = useExpenseMutation({
        client: supabase,
        queryClient,
        bookId: getPageBookId(),
        onMutate: onInitLoading,
        onSettled: onStopLoading
    });

    const useUpsertExpense: Action<HTMLElement> = (node) => {
        const onKeydown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onBlur?.();
                return;
            }

            const newExpense = { amount, comment, date };
            if (event.key !== 'Enter' || !isExpenseValid(newExpense) || !page) {
                return;
            }

            event.preventDefault();

            if (expense && !hasExpenseChanged(expense, newExpense)) {
                return;
            }

            $expenseMutation.mutate({
                id: expense?.id ?? undefined,
                page,
                date,
                comment,
                amount: Number(amount)
            });
            node.blur();
            onBlur?.();
        };

        node.addEventListener('keydown', onKeydown);

        return {
            destroy() {
                node.removeEventListener('keydown', onKeydown);
            }
        };
    };

    // TODO: Create an event that will blur the fields when
    // the user clicks outside any field of the table - maybe its
    // easier to just detect clicks outside the tr
</script>

<tr class="group flex w-full items-stretch hover:bg-secondary-50">
    <td class=" relative w-32 shrink-0 border-b border-secondary-100 p-3">
        <Date
            disableAutofocus={forceFocus !== 'date' || disableAutofocus}
            bind:value={date}
            use={[useUpsertExpense]}
        />
    </td>
    <td class=" w-32 shrink-0 border-b border-secondary-100 p-3">
        <Amount bind:value={amount} forceFocus={forceFocus === 'amount'} use={[useUpsertExpense]} />
    </td>
    <td class=" relative h-[45px] w-full min-w-64 border-b border-secondary-100 p-3">
        <Comment
            bind:value={comment}
            {expenses}
            autofocus={forceFocus === 'comment'}
            use={[useUpsertExpense]}
        />
    </td>
    <td class="min-w-24 border-b border-secondary-100 p-3 md:min-w-40"> </td>
</tr>
