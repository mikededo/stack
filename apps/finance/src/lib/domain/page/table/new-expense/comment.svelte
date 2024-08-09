<script lang="ts">
    import type { Action } from 'svelte/action';

    import { type ActionArray, clickAway, portal, useActions } from '@mstack/actions';
    import { FloatingCard } from '@mstack/ui';
    import { Keys } from '@mstack/utils';

    import type { Expense } from '$lib/db';

    import { getNewEntryMatches } from '../helpers';

    type Props = {
        autofocus?: boolean;
        expenses: Expense[];
        use?: ActionArray;
        value?: string;
    };
    let { autofocus, expenses, use = [], value = $bindable('') }: Props = $props();

    let textarea = $state(autofocus ?? false);
    let textareaNode = $state<HTMLTextAreaElement | null>(null);
    let autocompleteOptionsNode = $state<HTMLDivElement | null>(null);
    let autocompleteOptions = $derived(textarea ? getNewEntryMatches(expenses, value) : []);
    let autocompletePosition = $derived.by(() => {
        if (!textareaNode) {
            return undefined;
        }

        let client = textareaNode.getBoundingClientRect();
        return {
            left: client.x,
            top: client.y + client.height + 8, // 8 as padding
            width: client.width
        };
    });

    $effect(() => {
        if (autofocus && textareaNode && document.activeElement !== textareaNode) {
            textareaNode.focus();
        }
    });

    const useAutocomplete: Action = (node) => {
        node.addEventListener('keydown', (event) => {
            if (!autocompleteOptionsNode) {
                return;
            }

            const children = autocompleteOptionsNode.children;
            if (event.key === Keys.ArrowDown) {
                (children[0] as HTMLElement).focus();
            } else if (event.key === Keys.ArrowUp) {
                (children[children.length - 1] as HTMLElement).focus();
            }
        });
    };

    const handleOnShowTextarea = () => {
        textarea = true;
    };

    const handleOnClickAway = () => {
        textarea = false;
    };

    let autocompleteActions = $derived<ActionArray>([
        ...use,
        [clickAway, handleOnClickAway],
        useAutocomplete
    ]);
</script>

{#if textarea}
    <textarea
        class="w-full resize-none outline-none hover:bg-secondary-50 group-hover:bg-secondary-50"
        bind:this={textareaNode}
        bind:value
        use:useActions={autocompleteActions}
        name="comment"
        placeholder="What was this expense for...?"
        rows={1}
        style="field-sizing: content"
    ></textarea>
{:else}
    <button
        class="w-full truncate text-left outline-none"
        onclick={handleOnShowTextarea}
        onfocus={handleOnShowTextarea}
        class:text-secondary-300={!value}
        name="comment"
    >
        {value ? value : 'What was this expense for...?'}
    </button>
{/if}

{#if textarea && autocompleteOptions.length}
    <FloatingCard
        class="rounded-0 overflow-hidden p-0"
        position={autocompletePosition}
        use={[[portal, '']]}
    >
        <div
            class="flex max-h-44 w-full flex-col gap-[1px] overflow-y-auto overflow-x-hidden p-1"
            bind:this={autocompleteOptionsNode}
        >
            {#each autocompleteOptions as { expense, html } (expense.id)}
                <button
                    class="w-full rounded-md px-2 py-1 text-left text-sm outline-none transition-colors hover:bg-secondary-50 focus:bg-secondary-50 active:bg-secondary-50"
                    onclick={() => {
                        value = expense.comment!;
                    }}
                >
                    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                    {@html html}
                </button>
            {/each}
        </div>
    </FloatingCard>
{/if}
