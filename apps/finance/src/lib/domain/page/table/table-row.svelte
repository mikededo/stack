<script context="module" lang="ts">
    type ProxyFn = <F extends (...args: any) => any = () => void>(cb: F) => () => void;

    const baseTdStyles = (styles?: string) =>
        twMerge('border-b border-secondary-100 p-3 outline-none focus:bg-secondary-50', styles);
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

    import NewEntry, { type ForceFocus } from './new-entry.svelte';
    import { activateRow, disableRow, isRowActive, newRowInto } from './state.svelte';

    type Props = { expense: Expense; position: number };
    let { expense, position }: Props = $props();

    let menu = createContextMenu();
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
    class="group flex w-full items-stretch hover:bg-secondary-50 aria-current:bg-secondary-50"
    use:menu.trigger
    aria-current={isRowActive(position) || menu.states.isMenuActive}
>
    {#if editRow}
        <NewEntry
            onBlur={handleOnEditMode(null)}
            disableAutofocus
            {expense}
            nested
            forceFocus={editRow}
        />
    {:else}
        <td class={baseTdStyles('w-32 shrink-0')} tabindex="0">
            <button class="cursor-text text-left outline-none" onclick={handleOnEditMode('date')}>
                {expense.date ? new Date(expense.date).toLocaleDateString() : ''}
            </button>
        </td>
        <td class={baseTdStyles('w-32 shrink-0')} onclick={handleOnEditMode('amount')} tabindex="0">
            <button class="w-full cursor-text text-left outline-none">
                &euro; {expense.amount?.toFixed(2)}
            </button>
        </td>
        <td
            class={baseTdStyles('w-full min-w-64')}
            onclick={handleOnEditMode('comment')}
            tabindex="0"
        >
            <button class="w-full cursor-text truncate text-left outline-none">
                {expense.comment}
            </button>
        </td>
        <td class={baseTdStyles('min-w-24 md:min-w-40')} onclick={console.log} tabindex="0">
            {#each expense.tags as tag (tag.id)}
                <Chip color={tag.color}>{tag.name}</Chip>
            {/each}
        </td>
    {/if}
</tr>

<ContextMenu menu={menu.menu} options={cmOptions} />
