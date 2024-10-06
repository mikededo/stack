<script lang="ts">
    import type { Action } from 'svelte/action';

    import { useActions } from '@stack/actions';
    import { ContextMenu, type ContextMenuOption, createContextMenu } from '@stack/ui';

    import type { Expense } from '$lib/db';

    import {
        ArrowDownToLine,
        ArrowUpToLine,
        ClipboardCopy,
        ClipboardPaste,
        Trash2
    } from 'lucide-svelte';

    import { DragCell, DragRow, getDragContext } from './drag';
    import Entry from './entry.svelte';
    import { activateRow, disableRow, isRowActive, newRowInto } from './state.svelte';

    type ProxyFn = <F extends (...args: any) => any = () => void>(cb: F) => () => void;
    type Props = { expense: Expense; position: number };
    const { expense, position }: Props = $props();

    const menu = createContextMenu();
    const dragContext = getDragContext();
    let rowNode = $state<HTMLDivElement>();

    const menuProxy: ProxyFn = cb => () => {
        activateRow(position);
        cb();
    };

    const onClick = menuProxy(() => {
        // eslint-disable-next-line no-alert
        window.alert('Under development');
    });

    const onNewRow = (type: 'above' | 'under') =>
        menuProxy(() => {
            newRowInto(type === 'above' ? position : position + 1);
            disableRow();
        });

    const cmOptions: ContextMenuOption[] = [
        { Icon: ArrowUpToLine, onClick: onNewRow('above'), text: 'New row (above)' },
        { Icon: ArrowDownToLine, onClick: onNewRow('under'), text: 'New row (under)' },
        { disabled: true, Icon: ClipboardCopy, onClick, text: 'Copy' },
        { disabled: true, Icon: ClipboardPaste, text: 'Paste' },
        'divider',
        { destructive: true, Icon: Trash2, onClick, text: 'Delete' }
    ];

    const useRow: Action = (node) => {
        node.addEventListener('mouseover', () => {
            if (!dragContext.isDragging) {
                return;
            }

            if (!dragContext.placeholderRowIndex) {
                dragContext.placeholderRowIndex = position;
            }
        });
        node.addEventListener('mouseleave', () => {
            if (dragContext.placeholderRowIndex === position) {
                dragContext.placeholderRowIndex = null;
            }
        });
    };

</script>

<div
    class="group flex min-h-[45px] w-full items-stretch aria-current:bg-primary-50 relative border-b border-primary-100"
    bind:this={rowNode}
    use:useActions={[menu.trigger, useRow]}
    aria-current={isRowActive(position) || menu.states.isMenuActive}
    aria-rowindex={position + 1}
    role="row"
    class:hover:bg-primary-50={!dragContext.isDragging}
>
    <DragCell {expense} {rowNode} />
    <Entry {expense} nested />
</div>

<!-- Copy of the dragged element -->
{#if dragContext.activeRow?.id !== expense?.id && dragContext.placeholderRowIndex === position}
    <DragRow {position} />
{/if}

<ContextMenu menu={menu.menu} options={cmOptions} />
