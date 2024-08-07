<script lang="ts">
    import { clickAway, portal, useActions, useAutofocus } from '@mstack/actions';
    import { FloatingCard } from '@mstack/ui';
    import { Keys } from '@mstack/utils';

    import type { Action } from 'svelte/action';

    import type { Expense } from '$lib/db';

    import { getNewEntryMatches } from '../helpers';

    type Props = { defaultValue?: string; expenses: Expense[] };
    let { defaultValue, expenses }: Props = $props();

    let comment = $state(defaultValue ?? '');
    let textarea = $state(false);
    let textareaNode = $state<HTMLTextAreaElement | null>(null);
    let autocompleteOptionsNode = $state<HTMLDivElement | null>(null);
    let autocompleteOptions = $derived(textarea ? getNewEntryMatches(expenses, comment) : []);
    let autocompletePosition = $derived.by(() => {
        if (!textareaNode) {
            return undefined;
        }

        let client = textareaNode.getBoundingClientRect();
        return {
            top: client.y + client.height + 8, // 8 as padding
            left: client.x,
            width: client.width
        };
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

    const handleOnHideTextarea = () => {
        textarea = false;
    };
</script>

{#if textarea}
    <textarea
        bind:this={textareaNode}
        bind:value={comment}
        name="comment"
        class="w-full resize-none outline-none hover:bg-secondary-50 group-hover:bg-secondary-50"
        placeholder="What was this expense for...?"
        style="field-sizing: content"
        rows={1}
        use:useActions={[[clickAway, handleOnHideTextarea], useAutofocus, useAutocomplete]}
    ></textarea>
{:else}
    <button
        name="comment"
        class="w-full truncate text-left outline-none"
        class:text-secondary-300={!comment}
        onclick={handleOnShowTextarea}
        onfocus={handleOnShowTextarea}
    >
        {comment ? comment : 'What was this expense for...?'}
    </button>
{/if}

{#if textarea && autocompleteOptions.length}
    <FloatingCard
        position={autocompletePosition}
        use={[[portal, '']]}
        class="rounded-0 overflow-hidden p-0"
    >
        <div
            bind:this={autocompleteOptionsNode}
            class="flex max-h-44 w-full flex-col gap-[1px] overflow-y-auto overflow-x-hidden p-1"
        >
            {#each autocompleteOptions as { html, expense } (expense.id)}
                <button
                    class="w-full rounded-md px-2 py-1 text-left text-sm outline-none transition-colors hover:bg-secondary-50 focus:bg-secondary-50 active:bg-secondary-50"
                    onclick={() => {
                        comment = expense.comment!;
                    }}
                >
                    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                    {@html html}
                </button>
            {/each}
        </div>
    </FloatingCard>
{/if}
