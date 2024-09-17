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
    import { Amount, Comment, Date } from './new-expense';
    import TagCombobox from './tag-combobox.svelte';

    let { disableAutofocus, expense, forceFocus, nested, onBlur, onClickAway }: Props = $props();

    const { id: userId } = getUserDataContext();
    const expenses = getPageExpenses();
    const page = getPageId();
    let amount = $state(`${expense?.amount?.toFixed(2) ?? ''}`);
    let comment = $state(expense?.comment ?? '');
    let date = $state(parseDate(expense?.date));
    let commentAutocompleteRef = $state<HTMLDivElement>();
    const expenseMutation = useExpenseMutation({
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
        if (
            event.target instanceof HTMLElement &&
            commentAutocompleteRef &&
            commentAutocompleteRef.contains(event.target)
        ) {
            return;
        }

        onClickAway?.();
    };
</script>

{#snippet content()}
    <td class="relative w-32 shrink-0 border-b border-primary-100 p-3">
        <Date
            bind:value={date}
            disableAutofocus={forceFocus !== 'date' || disableAutofocus}
            use={[useUpsertExpense]}
        />
    </td>
    <td class="w-32 shrink-0 border-b border-primary-100 p-3">
        <Amount bind:value={amount} forceFocus={forceFocus === 'amount'} use={[useUpsertExpense]} />
    </td>
    <td class=" relative max-h-[45px] w-full min-w-64 border-b border-primary-100 p-3">
        <Comment
            bind:cardRef={commentAutocompleteRef}
            bind:value={comment}
            autofocus={forceFocus === 'comment'}
            use={[useUpsertExpense]}
            {expenses}
        />
    </td>
    <td class="min-w-24 border-b border-primary-100 p-3 md:min-w-64">
        <TagCombobox expenseId={expense?.id} tags={expense?.tags ?? []} />
    </td>
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
