<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    import { useCell } from './use-cell.svelte';

    type EditSnippetProps = { onFinishEditing?: () => void };
    type Props = {
        'aria-colindex': number;
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
</script>

<div
    {...props}
    bind:this={cellNode}
    use:useCell={{ edit: Boolean(edit), onEdit, onStopEdit: onFinishEditing }}
    data-editing={isEditing}
    role="gridcell"
    tabindex="-1"
>
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
