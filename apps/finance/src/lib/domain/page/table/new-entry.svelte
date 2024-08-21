<script context="module" lang="ts">
    export type ForceFocus = 'amount' | 'comment' | 'date' | null;
    type Props = {
        disableAutofocus?: boolean;
        expense?: Expense;
        forceFocus?: ForceFocus;
        nested?: boolean;
        onBlur?: () => void;
        onClickAway?: () => void;
        onUpdateExpense?: (expense: Expense) => void;
    };
</script>

<script lang="ts">
    import type { Action } from 'svelte/action';

    import { clickAway } from '@stack/actions';
    import { getUserDataContext } from '@stack/svelte-supabase';
    import { Keys } from '@stack/utils';

    import type { Expense } from '$lib/db';

    import {
        getPageBookId,
        getPageExpenses,
        getPageId,
        onInitLoading,
        onStopLoading
    } from './context.svelte';
    import { hasExpenseChanged, isExpenseValid, parseDate } from './helpers';
    import { useExpenseMutation } from './hooks';
    import { Amount, Comment, COMMENT_AUTOCOMPLETE_ID, Date } from './new-expense';

    let {
        disableAutofocus,
        expense,
        forceFocus,
        nested,
        onBlur,
        onClickAway,
        onUpdateExpense
    }: Props = $props();

    let { id: userId } = getUserDataContext();
    let expenses = getPageExpenses();
    let page = getPageId();
    let amount = $state(`${expense?.amount?.toFixed(2) ?? ''}`);
    let comment = $state(expense?.comment ?? '');
    let date = $state(parseDate(expense?.date));
    let expenseMutation = useExpenseMutation({
        bookId: getPageBookId(),
        onMutate: onInitLoading,
        onSettled: onStopLoading,
        userId
    });

    const useUpsertExpense: Action<HTMLElement> = (node) => {
        const onKeydown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onBlur?.();
                return;
            }

            if (event.key !== Keys.Enter) {
                return;
            }

            const newExpense = { amount, comment, date };
            if (!isExpenseValid(newExpense) || !page) {
                return;
            }

            event.preventDefault();
            if (expense && !hasExpenseChanged(expense, newExpense)) {
                return;
            }

            const updatedFields = {
                amount: Number(amount.startsWith('€ ') ? amount.slice(1) : amount),
                comment,
                date
            };
            $expenseMutation.mutate(
                { ...updatedFields, id: expense?.id ?? undefined, page },
                {
                    onSuccess: () => {
                        // Restart the fields
                        amount = `${expense?.amount?.toFixed(2) ?? ''}`;
                        comment = expense?.comment ?? '';
                        date = parseDate(expense?.date);
                    }
                }
            );

            if (expense) {
                // Update current expense to improve ux
                onUpdateExpense?.({ ...expense, ...updatedFields });
            }

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

    const onInternalClickAway = (event: MouseEvent) => {
        // Special check in case the user clicks one of the autocomplete options
        if (event.target instanceof HTMLElement && event.target.closest(COMMENT_AUTOCOMPLETE_ID)) {
            return;
        }

        onClickAway?.();
    };

    // TODO: Create an event that will blur the fields when
    // the user clicks outside any field of the table - maybe its
    // easier to just detect clicks outside the tr
</script>

{#snippet content()}
    <td class="relative w-32 shrink-0 border-b border-primary-100 p-3">
        <Date
            bind:value={date}
            disableAutofocus={forceFocus !== 'date' || disableAutofocus}
            use={[useUpsertExpense]}
        />
    </td>
    <td class=" w-32 shrink-0 border-b border-primary-100 p-3">
        <Amount bind:value={amount} forceFocus={forceFocus === 'amount'} use={[useUpsertExpense]} />
    </td>
    <td class=" relative h-[45px] w-full min-w-64 border-b border-primary-100 p-3">
        <Comment
            bind:value={comment}
            autofocus={forceFocus === 'comment'}
            use={[useUpsertExpense]}
            {expenses}
        />
    </td>
    <td class="min-w-24 border-b border-primary-100 p-3 md:min-w-40"></td>
{/snippet}

{#if nested}
    {@render content()}
{:else}
    <tr
        class="group flex w-full items-stretch hover:bg-primary-50"
        use:clickAway={onInternalClickAway}
    >
        {@render content()}
    </tr>
{/if}
