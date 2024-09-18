<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { Action } from 'svelte/action';
    import type { HTMLAttributes } from 'svelte/elements';

    import { clickAway } from '@stack/actions';
    import { Keys } from '@stack/utils';

    type EditSnippetProps = { onFinishEditing?: () => void };
    type Props = {
        edit?: Snippet<[EditSnippetProps]>;
    } & Omit<HTMLAttributes<HTMLDivElement>, 'role' | 'tabindex'>;
    let { edit, ...props }: Props = $props();

    let isEditing = $state(false);
    let cellNode = $state<HTMLDivElement>();

    const onEdit = () => {
        isEditing = true;
    };

    const onFinishEditing = () => {
        isEditing = false;

        // Bring back the focus to the cell, if it has been lost
        if (document.activeElement !== cellNode && cellNode) {
            cellNode.focus();
        }
    };

    const useCell: Action<HTMLDivElement> = (node) => {
        node.addEventListener('focus', () => {
            node.tabIndex = 0;
        });
        node.addEventListener('blur', () => {
            if (!edit) {
                node.tabIndex = -1;
            }
        });
        clickAway(node, () => {
            // tabIndex === 0 means the cell is focused
            if (isEditing || node.tabIndex === 0) {
                onFinishEditing();
                node.tabIndex = -1;
            }
        });
        if (edit) {
            node.addEventListener('dblclick', onEdit);
            node.addEventListener('keydown', (event) => {
                if (event.key === Keys.Enter) {
                    onEdit();
                    // Avoid adding a new line when pressing enter
                    event.preventDefault();
                } else if (event.key === Keys.Escape) {
                    // Stop editing
                    onFinishEditing();
                }
            });
        }
    };
</script>

<div {...props} bind:this={cellNode} use:useCell role="gridcell" tabindex="-1">
    {#if isEditing && edit}
        {@render edit?.({ onFinishEditing })}
    {:else}
        {@render props.children?.()}
    {/if}
</div>

<style lang="postcss">
    div[role='gridcell'] {
        @apply outline-none;
    }

    div[role='gridcell'][tabindex='0'] {
        box-shadow: inset 0 0 0 1px theme('colors.primary.500');
    }
</style>
