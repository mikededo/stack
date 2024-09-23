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
        GripVertical,
        Trash2
    } from 'lucide-svelte';

    import { getDragContext, onDrag, onStartDragging, onStopDragging } from './drag-context.svelte';
    import Entry from './entry.svelte';
    import RowPlaceholder from './row-placeholder.svelte';
    import { activateRow, disableRow, isRowActive, newRowInto } from './state.svelte';

    type ProxyFn = <F extends (...args: any) => any = () => void>(cb: F) => () => void;
    type Props = { expense: Expense; position: number };
    const { expense, position }: Props = $props();

    const menu = createContextMenu();
    const dragContext = getDragContext();
    let rowNode = $state<HTMLDivElement>();
    let placeholder = $state(false);

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

    const useDragCell: Action = (node) => {
        const onMouseMove = (e: MouseEvent) => {
            if (!dragContext.isDragging || dragContext.activeRow?.id !== expense?.id) {
                return;
            }

            onDrag({ x: e.clientX, y: e.clientY });
        };

        const onMouseUp = () => {
            onStopDragging();
            if (placeholder) {
                placeholder = false;
            }
        };

        const onMouseDown = (e: MouseEvent) => {
            if (!rowNode) {
                return;
            }

            const { width } = rowNode.getBoundingClientRect();
            onStartDragging(expense, { width, x: e.clientX, y: e.clientY });
        };

        node.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        return {
            destroy() {
                document.removeEventListener('mouseup', onMouseUp);
                document.querySelectorAll('div[role="grid"]').forEach((row) => {
                    row.classList.remove('select-none');
                });
            }
        };
    };

    const useRow: Action = (node) => {
        node.addEventListener('mouseover', () => {
            if (!dragContext.isDragging) {
                return;
            }

            if (!placeholder) {
                placeholder = true;
            }
        });
        node.addEventListener('mouseleave', () => {
            // Do not remove placeholder if mouseout triggered by a child
            if (placeholder) {
                placeholder = false;
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
    <div class="w-8 flex pt-3.5 justify-center shrink-0 cursor-grab" use:useDragCell role="gridcell">
        <GripVertical class="fill-surface-500" size={16} />
    </div>
    <Entry {expense} nested />
</div>

<!-- Copy of the dragged element -->
{#if dragContext.activeRow?.id !== expense?.id && placeholder}
    <RowPlaceholder {position} />
{/if}

<ContextMenu menu={menu.menu} options={cmOptions} />
