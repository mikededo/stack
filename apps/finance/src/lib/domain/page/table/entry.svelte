<script lang="ts">
    import type { Action } from 'svelte/action';

    import { clickAway } from '@stack/actions';
    import { getUserDataContext } from '@stack/supabase';
    import { Chip } from '@stack/ui';
    import { Keys } from '@stack/utils';

    import type { Expense } from '$lib/db';

    import { useExpenseTagsModifiers } from '$lib/hooks';

    import {
        getPageBookId,
        getPageExpenses,
        getPageId,
        onInitLoading,
        onStopLoading
    } from './context.svelte';
    import EntryContent from './entry-content.svelte';
    import { hasExpenseChanged, isExpenseValid, parseDate } from './helpers';
    import { useExpenseMutation } from './hooks';
    import { Amount, Comment, Date } from './new-expense';
    import TagCombobox from './tag-combobox.svelte';

    type Props = {
        empty?: boolean;
        expense?: Expense;
        onClickAway?: () => void;
        onUpdateExpense?: (expense: Expense) => void;
    } & ({ nested: true; position?: never } | { position: number; nested?: false });
    const { empty, expense, nested, onClickAway, position }: Props = $props();

    const { id: userId } = getUserDataContext();
    const expenses = getPageExpenses();
    const book = getPageBookId();
    const page = getPageId();
    const expenseMutation = useExpenseMutation({
        bookId: book,
        onMutate: onInitLoading,
        onSettled: onStopLoading,
        userId
    });
    const { remove } = useExpenseTagsModifiers({ book, page });

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

    const onDeleteTag = (tag: number) => () => {
        if (!expense || !expense.id) {
            // TS check
            return;
        }

        $remove.mutate({ expense: expense.id, tag });
    };
</script>

{#snippet value_or_placeholder(value: string | undefined, placeholder: string)}
    {#if value}
        {value}
    {:else}
        <span class="italic text-surface-500">{placeholder}</span>
    {/if}
{/snippet}

{#snippet content()}
    <EntryContent>
        {#snippet dateContent()}
            {@render value_or_placeholder(date, 'dd/mm/yyyy')}
        {/snippet}
        {#snippet dateEdit()}
            <Date bind:value={date} use={[useUpsertExpense]} />
        {/snippet}

        {#snippet amountContent()}
            {@render value_or_placeholder(amount ? `€ ${amount}` : undefined, '€ 0.00')}
        {/snippet}
        {#snippet amountEdit()}
            <Amount bind:value={amount} use={[useUpsertExpense]} />
        {/snippet}

        {#snippet commentContent()}
            {@render value_or_placeholder(comment, 'What\'s this expense about?')}
        {/snippet}
        {#snippet commentEdit({ onFinishEditing })}
            <Comment
                bind:cardRef={commentAutocompleteRef}
                bind:value={comment}
                use={[useUpsertExpense]}
                {expenses}
                onBlur={onFinishEditing}
            />
        {/snippet}

        {#snippet tagsContent()}
            <div class="flex flex-wrap items-center gap-1">
                {#each expense?.tags ?? [] as tag (tag.id)}
                    <Chip color={tag.color} onClick={onDeleteTag(tag.id)}>{tag.name}</Chip>
                {/each}
            </div>
        {/snippet}
        {#snippet tagsEdit()}
            <TagCombobox expenseId={expense?.id} tags={expense?.tags ?? []} />
        {/snippet}
    </EntryContent>
{/snippet}

{#if nested}
    {#if empty}<div class="w-8 shrink-0" role="gridcell"></div>{/if}
    {@render content()}
{:else if position !== undefined}
    <div
        class="group flex min-h-[45px] w-full items-stretch hover:bg-primary-50"
        use:clickAway={onInternalClickAway}
        aria-rowindex={position + 1}
        role="row"
    >
        {#if empty}<div class="w-8 shrink-0" role="gridcell"></div>{/if}
        {@render content()}
    </div>
{/if}
