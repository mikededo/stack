<script lang="ts">
    import type { Action } from 'svelte/action';

    import { type ActionArray, useActions } from '@stack/actions';
    import { Autocomplete } from '@stack/ui';
    import { Keys } from '@stack/utils';

    import type { Expense } from '$lib/db';

    import { getNewEntryMatches } from '../helpers';

    type Props = {
        autofocus?: boolean;
        expenses: Expense[];
        use?: ActionArray;
        value?: string;
    };
    let { autofocus, expenses, use = [], value = $bindable('') }: Props = $props();

    let show = $state(autofocus ?? false);
    let autocompleteOptions = $derived(show ? getNewEntryMatches(expenses, value) : []);

    const handleOnShowAutocomplete = () => {
        show = true;
    };

    const handleOnHideAutocomplete = () => {
        show = false;
    };

    const handleOnOptionClick = (comment: string) => () => {
        value = comment;
    };

    const fieldAutofocus: Action = (node) => {
        if (autofocus) {
            node.focus();
        }

        const onKeydown = (event: KeyboardEvent) => {
            if (event.key === Keys.Tab) {
                handleOnHideAutocomplete();
            }
        };

        const onBlur = () => {
            handleOnHideAutocomplete();
        };

        node.addEventListener('keydown', onKeydown);
        node.addEventListener('blur', onBlur);

        return {
            destroy() {
                node.removeEventListener('keydown', onKeydown);
                node.removeEventListener('blur', onBlur);
            }
        };
    };
</script>

<Autocomplete show={!!autocompleteOptions.length && show} onClickAway={handleOnHideAutocomplete}>
    <textarea
        class="w-full resize-none outline-none group-hover:bg-primary-50 hover:bg-primary-50"
        bind:value
        use:useActions={[...use, fieldAutofocus]}
        name="comment"
        placeholder="What was this expense for...?"
        rows={1}
        style="field-sizing: content"
        onfocus={handleOnShowAutocomplete}
    ></textarea>

    {#snippet options()}
        {#each autocompleteOptions as { expense, html } (expense.id)}
            <button
                class="w-full rounded-md px-2 py-1 text-left text-sm outline-none transition-colors hover:bg-primary-50 focus:bg-primary-50 active:bg-primary-50"
                onclick={handleOnOptionClick(expense.comment!)}
            >
                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                {@html html}
            </button>
        {/each}
    {/snippet}
</Autocomplete>
