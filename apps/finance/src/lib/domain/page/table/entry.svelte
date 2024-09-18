<script lang="ts">
    import type { Action } from 'svelte/action';

    import { clickAway } from '@stack/actions';
    import { getUserDataContext } from '@stack/svelte-supabase';
    import { Chip } from '@stack/ui';
    import { Keys } from '@stack/utils';

    import type { Expense } from '$lib/db';

    import Cell from './cell.svelte';
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

    type Props = {
        expense?: Expense;
        nested?: boolean;
        onClickAway?: () => void;
        onUpdateExpense?: (expense: Expense) => void;
    };
    let { expense, nested, onClickAway }: Props = $props();

    const { id: userId } = getUserDataContext();
    const expenses = getPageExpenses();
    const page = getPageId();
    const expenseMutation = useExpenseMutation({
        bookId: getPageBookId(),
        onMutate: onInitLoading,
        onSettled: onStopLoading,
        userId
    });

    let amount = $state(`${expense?.amount?.toFixed(2) ?? ''}`);
    let comment = $state(expense?.comment ?? '');
    let date = $state(parseDate(expense?.date));
    let commentAutocompleteRef = $state<HTMLDivElement>();

    const useUpsertExpense: Action<HTMLElement> = (node) => {
        const onKeydown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
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
    <Cell class="w-32 shrink-0 border-b border-primary-100 p-3">
        {#snippet edit()}
            <Date bind:value={date} use={[useUpsertExpense]} />
        {/snippet}

        {date}
    </Cell>

    <Cell class="w-32 shrink-0 border-b border-primary-100 p-3">
        {#snippet edit()}
            <Amount bind:value={amount} use={[useUpsertExpense]} />
        {/snippet}

        {#if amount}&euro; {amount}{/if}
    </Cell>

    <Cell class="relative w-full min-w-64 border-b border-primary-100 p-3">
        {#snippet edit({ onFinishEditing })}
            <Comment
                bind:cardRef={commentAutocompleteRef}
                bind:value={comment}
                use={[useUpsertExpense]}
                {expenses}
                onBlur={onFinishEditing}
            />
        {/snippet}

        {comment}
    </Cell>

    <Cell class="w-48 shrink-0 border-b border-primary-100 p-3 md:w-72">
        {#snippet edit()}
            <TagCombobox expenseId={expense?.id} tags={expense?.tags ?? []} />
        {/snippet}

        <div class="flex flex-wrap items-center gap-1">
            {#each expense?.tags ?? [] as tag (tag.id)}
                <Chip color={tag.color}>{tag.name}</Chip>
            {/each}
        </div>
    </Cell>
{/snippet}

{#if nested}
    {@render content()}
{:else}
    <div
        class="group flex w-full items-stretch hover:bg-primary-50"
        use:clickAway={onInternalClickAway}
    >
        {@render content()}
    </div>
{/if}
