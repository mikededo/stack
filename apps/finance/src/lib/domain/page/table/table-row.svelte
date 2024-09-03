<script context="module" lang="ts">
    type ProxyFn = <F extends (...args: any) => any = () => void>(cb: F) => () => void;

    const baseTdStyles = (styles?: string) =>
        twMerge('border-b border-primary-100 p-3 outline-none focus:bg-primary-50', styles);
</script>

<script lang="ts">
    import { ContextMenu, type ContextMenuOption, createContextMenu } from '@stack/ui';

    import {
        ArrowDownToLine,
        ArrowUpToLine,
        ClipboardCopy,
        ClipboardPaste,
        Trash2
    } from 'lucide-svelte';
    import { twMerge } from 'tailwind-merge';

    import type { Expense } from '$lib/db';

    import NewEntry, { type ForceFocus } from './new-entry.svelte';
    import { activateRow, disableRow, isRowActive, newRowInto } from './state.svelte';

    type Props = { expense: Expense; position: number };
    let { expense, position }: Props = $props();

    let menu = createContextMenu();
    let internalExpense = $state(expense);
    let editRow = $state<ForceFocus>(null);

    const menuProxy: ProxyFn = (cb) => () => {
        activateRow(position);
        cb();
    };

    const onClick = menuProxy(() => {
        window.alert('Under development');
    });

    const onNewRow = (type: 'above' | 'under') =>
        menuProxy(() => {
            newRowInto(type === 'above' ? position : position + 1);
            disableRow();
        });

    const onEditMode = (focusMode: ForceFocus) => () => {
        editRow = focusMode;
    };

    const onUpdateExpense = (expense: Expense) => {
        internalExpense = expense;
        onEditMode(null)();
    };

    const cmOptions: ContextMenuOption[] = [
        { Icon: ArrowUpToLine, onClick: onNewRow('above'), text: 'New row (above)' },
        { Icon: ArrowDownToLine, onClick: onNewRow('under'), text: 'New row (under)' },
        { disabled: true, Icon: ClipboardCopy, onClick, text: 'Copy' },
        { disabled: true, Icon: ClipboardPaste, text: 'Paste' },
        'divider',
        { destructive: true, Icon: Trash2, onClick, text: 'Delete' }
    ];
</script>

<tr
    class="group flex w-full items-stretch aria-current:bg-primary-50 hover:bg-primary-50"
    use:menu.trigger
    aria-current={isRowActive(position) || menu.states.isMenuActive}
>
    <NewEntry
        expense={internalExpense}
        forceFocus={editRow}
        disableAutofocus
        nested
        onBlur={onEditMode(null)}
        {onUpdateExpense}
    />
</tr>

<ContextMenu menu={menu.menu} options={cmOptions} />
