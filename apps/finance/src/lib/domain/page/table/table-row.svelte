<script lang="ts">
    import { ContextMenu, type ContextMenuOption, createContextMenu } from '@stack/ui';

    import type { Expense } from '$lib/db';

    import {
        ArrowDownToLine,
        ArrowUpToLine,
        ClipboardCopy,
        ClipboardPaste,
        Trash2
    } from 'lucide-svelte';

    import Entry from './entry.svelte';
    import { activateRow, disableRow, isRowActive, newRowInto } from './state.svelte';

    type ProxyFn = <F extends (...args: any) => any = () => void>(cb: F) => () => void;
    type Props = { expense: Expense; position: number };
    let { expense, position }: Props = $props();

    let menu = createContextMenu();

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

    const cmOptions: ContextMenuOption[] = [
        { Icon: ArrowUpToLine, onClick: onNewRow('above'), text: 'New row (above)' },
        { Icon: ArrowDownToLine, onClick: onNewRow('under'), text: 'New row (under)' },
        { disabled: true, Icon: ClipboardCopy, onClick, text: 'Copy' },
        { disabled: true, Icon: ClipboardPaste, text: 'Paste' },
        'divider',
        { destructive: true, Icon: Trash2, onClick, text: 'Delete' }
    ];
</script>

<div
    class="group flex min-h-[45px] w-full items-stretch aria-current:bg-primary-50 hover:bg-primary-50"
    use:menu.trigger
    aria-current={isRowActive(position) || menu.states.isMenuActive}
    aria-rowindex={position + 1}
    role="row"
>
    <Entry {expense} nested />
</div>

<ContextMenu menu={menu.menu} options={cmOptions} />
