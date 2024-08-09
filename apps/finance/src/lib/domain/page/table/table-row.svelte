<script context="module" lang="ts">
    type ProxyFn = <F extends (...args: any) => any = () => void>(cb: F) => () => void;

    const baseTdStyles = (styles?: string) =>
        twMerge('border-secondary-100 focus:bg-secondary-50 border-b p-3 outline-none', styles);
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
    class="hover:bg-secondary-50 aria-current:bg-secondary-50 group flex w-full items-stretch"
    use:menu.trigger
    aria-current={isRowActive(position) || menu.states.isMenuActive}
>
    {#if editRow}
        <NewEntry
            expense={internalExpense}
            forceFocus={editRow}
            disableAutofocus
            nested
            onBlur={handleOnEditMode(null)}
            onUpdateExpense={handleonUpdateExpense}
        />
    {:else}
        <td class={baseTdStyles('w-32 shrink-0')} tabindex="0">
            <button class="cursor-text text-left outline-none" onclick={handleOnEditMode('date')}>
                {parseDate(internalExpense.date)}
            </button>
        </td>
        <td class={baseTdStyles('w-32 shrink-0')} tabindex="0" onclick={handleOnEditMode('amount')}>
            <button class="w-full cursor-text text-left outline-none">
                &euro; {internalExpense.amount?.toFixed(2)}
            </button>
        </td>
        <td
            class={baseTdStyles('w-full min-w-64')}
            tabindex="0"
            onclick={handleOnEditMode('comment')}
        >
            <button class="w-full cursor-text truncate text-left outline-none">
                {internalExpense.comment}
            </button>
        </td>
        <td class={baseTdStyles('min-w-24 md:min-w-40')} tabindex="0" onclick={console.log}>
            {#each expense.tags as tag (tag.id)}
                <Chip color={tag.color}>{tag.name}</Chip>
            {/each}
        </td>
    {/if}
</tr>

<ContextMenu menu={menu.menu} options={cmOptions} />
