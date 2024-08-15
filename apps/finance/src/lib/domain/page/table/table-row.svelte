<script context="module" lang="ts">
    type ProxyFn = <F extends (...args: any) => any = () => void>(cb: F) => () => void;

    const baseTdStyles = (styles?: string) =>
        twMerge('border-b border-primary-100 p-3 outline-none focus:bg-primary-50', styles);
</script>

<script lang="ts">
    import { Chip, ContextMenu, type ContextMenuOption, createContextMenu } from '@mstack/ui';

    import {
        ArrowDownToLine,
        ArrowUpToLine,
        ClipboardCopy,
        ClipboardPaste,
        Trash2
    } from 'lucide-svelte';
    import { twMerge } from 'tailwind-merge';

    import type { Expense } from '$lib/db';

    import { parseDate } from './helpers';
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

    const handleOnClick = menuProxy(() => {
        window.alert('Under development');
    });

    const handleOnNewRow = (type: 'above' | 'under') =>
        menuProxy(() => {
            newRowInto(type === 'above' ? position : position + 1);
            disableRow();
        });

    const handleOnEditMode = (focusMode: ForceFocus) => () => {
        editRow = focusMode;
    };

    const handleonUpdateExpense = (expense: Expense) => {
        internalExpense = expense;
        handleOnEditMode(null)();
    };

    const cmOptions: ContextMenuOption[] = [
        { Icon: ArrowUpToLine, onClick: handleOnNewRow('above'), text: 'New row (above)' },
        { Icon: ArrowDownToLine, onClick: handleOnNewRow('under'), text: 'New row (under)' },
        { disabled: true, Icon: ClipboardCopy, onClick: handleOnClick, text: 'Copy' },
        { disabled: true, Icon: ClipboardPaste, text: 'Paste' },
        'divider',
        { destructive: true, Icon: Trash2, onClick: handleOnClick, text: 'Delete' }
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
        onBlur={handleOnEditMode(null)}
        onUpdateExpense={handleonUpdateExpense}
    />
</tr>

<ContextMenu menu={menu.menu} options={cmOptions} />
