<script lang="ts" context="module">
    type ProxyFn = <F extends (...args: any) => any = () => void>(cb: F) => () => void;
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

    import type { Page } from '$lib/db';

    import { activateRow, disableRow, isRowActive, newRowInto } from './state.svelte';

    type Props = { expense: Page['expenses'][number]; position: number };
    let { expense, position }: Props = $props();

    let menu = createContextMenu();

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
    class="flex w-full items-stretch hover:bg-secondary-50 aria-[current='true']:bg-secondary-100/50"
    use:menu.trigger
    aria-current={isRowActive(position) || menu.states.isMenuActive}
>
    <td class="w-32 shrink-0 border-b border-secondary-100 p-3">
        {expense.date ? new Date(expense.date).toLocaleDateString() : ''}
    </td>
    <td class="w-32 shrink-0 border-b border-secondary-100 p-3">
        &euro; {expense.amount?.toFixed(2)}
    </td>
    <td class="w-full min-w-64 truncate border-b border-secondary-100 p-3">
        {expense.comment}
    </td>
    <td class="border-b border-secondary-100 p-3 sm:min-w-24 md:min-w-40">
        {#each expense.tags as tag (tag.id)}
            <Chip color={tag.color}>{tag.name}</Chip>
        {/each}
    </td>
</tr>

<ContextMenu menu={menu.menu} options={cmOptions} />
