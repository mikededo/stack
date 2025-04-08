<script lang="ts">
    import type { ActionArray } from '@stack/actions';

    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    import { useActions } from '@stack/actions';

    import { useCell } from './use-cell';

    type EditSnippetProps = { onFinishEditing?: () => void };
    type Props = {
        'aria-colindex': number;
        edit?: Snippet<[EditSnippetProps]>;
        use?: ActionArray;
    } & Omit<HTMLAttributes<HTMLDivElement>, 'role' | 'tabindex'>;
    const { edit, use = [], ...restProps }: Props = $props();

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
</script>

<div
    {...restProps}
    bind:this={cellNode}
    use:useActions={[...use, [useCell, { edit: Boolean(edit), onEdit, onStopEdit: onFinishEditing }]]}
    data-editing={isEditing}
    role="gridcell"
    tabindex="-1"
>
    {#if isEditing && edit}
        {@render edit?.({ onFinishEditing })}
    {:else}
        {@render restProps.children?.()}
    {/if}
</div>

<style>
    div[role='gridcell'] {
        outline-style: none;
    }

    div[role='gridcell'][tabindex='0'] {
        box-shadow: inset 0 0 0 1px theme(--color-primary-500);
    }
</style>
