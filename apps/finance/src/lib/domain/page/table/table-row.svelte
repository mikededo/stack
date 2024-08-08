<script lang="ts" context="module">
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
        { text: 'New row (above)', Icon: ArrowUpToLine, onClick: handleOnNewRow('above') },
        { text: 'New row (under)', Icon: ArrowDownToLine, onClick: handleOnNewRow('under') },
        { text: 'Copy', Icon: ClipboardCopy, onClick: handleOnClick, disabled: true },
        { text: 'Paste', Icon: ClipboardPaste, disabled: true },
        'divider',
        { text: 'Delete', Icon: Trash2, onClick: handleOnClick, destructive: true }
    ];
</script>

<tr
    class="flex w-full items-stretch hover:bg-secondary-50 aria-[current='true']:bg-secondary-50"
    use:menu.trigger
    aria-current={isRowActive(position) || menu.states.isMenuActive}
>
    {#if editRow}
        <NewEntry {expense} forceFocus={editRow} onBlur={handleOnEditMode(null)} disableAutofocus />
    {:else}
        <td class={baseTdStyles('w-32 shrink-0')} tabindex="0">
            <button class="cursor-text text-left outline-none" onclick={handleOnEditMode('date')}>
                {expense.date ? new Date(expense.date).toLocaleDateString() : ''}
            </button>
        </td>
        <td class={baseTdStyles('w-32 shrink-0')} tabindex="0" onclick={handleOnEditMode('amount')}>
            <button class="w-full cursor-text text-left outline-none">
                &euro; {expense.amount?.toFixed(2)}
            </button>
        </td>
        <td
            class={baseTdStyles('w-full min-w-64')}
            tabindex="0"
            onclick={handleOnEditMode('comment')}
        >
            <button class="w-full cursor-text truncate text-left outline-none">
                {expense.comment}
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
