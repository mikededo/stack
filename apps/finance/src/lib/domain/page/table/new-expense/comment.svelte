<script lang="ts">
    import { useTrapFocus } from '@stack/actions';
    import { type ActionArray, useActions } from '@stack/actions';
    import { Autocomplete } from '@stack/ui';

    import type { Expense } from '$lib/db';

    import { getNewEntryMatches } from '../helpers';
    import { useFieldAutofocus, useOptionButton } from './comment';

    type Props = {
        // TODO: Replace expenses for context
        expenses: Expense[];
        cardRef?: HTMLDivElement;
        use?: ActionArray;
        value?: string;
        onBlur?: () => void;
    };
    let {
        cardRef = $bindable(),
        expenses,
        onBlur,
        use = [],
        value = $bindable('')
    }: Props = $props();

    let previewValue = $state('');
    // We always show the autocomplete on load, as the input is autofocused
    let show = $state(true);
    let inputRef = $state<HTMLTextAreaElement>();
    const autocompleteOptions = $derived(show ? getNewEntryMatches(expenses, value) : []);

    const onValueChange = (updated: string, fromFocus?: boolean) => {
        if (fromFocus) {
            previewValue = updated;
            return;
        }

        value = updated;
    };

    const onClearPreviewValue = () => {
        previewValue = '';
    };

    const onShowAutocomplete = () => {
        show = true;
    };

    const onHideAutocomplete = () => {
        show = false;
        onClearPreviewValue();
        onBlur?.();
    };
</script>

<Autocomplete
    class="h-full w-full"
    bind:cardRef
    cardClasses="!left-3"
    show={!!autocompleteOptions.length && show}
    onClickAway={onHideAutocomplete}
>
    <textarea
        class="h-full w-full resize-none outline-none group-hover:bg-primary-50 group-aria-current:bg-primary-50 hover:bg-primary-50"
        bind:this={inputRef}
        bind:value
        use:useActions={[...use, [useFieldAutofocus, { onClearPreviewValue, onHideAutocomplete }]]}
        name="comment"
        placeholder="What was this expense for...?"
        rows={1}
        style="field-sizing: content"
        onfocus={onShowAutocomplete}
    ></textarea>
    {#if previewValue}
        <!-- Preview needs to be handled here as the component does not handle the input  -->
        <div
            class="absolute inset-3 bg-white italic group-hover:bg-primary-50 group-aria-current:bg-primary-50 hover:bg-primary-50"
        >
            {previewValue}
        </div>
    {/if}

    {#snippet options()}
        <div use:useTrapFocus>
            {#each autocompleteOptions as { expense, html } (expense.id)}
                {@const options = {
                    comment: expense.comment!,
                    inputRef,
                    onHideAutocomplete,
                    onValueChange
                }}

                <button
                    class="w-full rounded-md px-2 py-1 text-left text-sm outline-none transition-colors hover:bg-primary-50 focus:bg-primary-50 active:bg-primary-50"
                    use:useOptionButton={options}
                >
                    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                    {@html html}
                </button>
            {/each}
        </div>
    {/snippet}
</Autocomplete>
