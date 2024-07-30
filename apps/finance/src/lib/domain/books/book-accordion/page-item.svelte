<script lang="ts">
    import { ContextMenu, type ContextMenuOption, createContextMenu } from '@mstack/ui';

    import {
        ClipboardCopyIcon,
        ClipboardPasteIcon,
        ClipboardPlusIcon,
        File,
        Link2,
        PencilIcon
    } from 'lucide-svelte';
    import type { Snippet } from 'svelte';

    type Props = {
        href: string;
        name: Snippet;
        owner: string;
        createdAt: Date;
        isShared?: boolean;
    };
    let { href, name, owner, createdAt, isShared }: Props = $props();

    let menu = createContextMenu();

    const handleOnClick = () => {
        window.alert('Under development');
    };

    const cmOptions: ContextMenuOption[] = [
        { text: 'Copy', Icon: ClipboardCopyIcon, onClick: handleOnClick },
        { text: 'Duplicate', Icon: ClipboardPlusIcon, onClick: handleOnClick },
        { text: 'Paste', Icon: ClipboardPasteIcon, onClick: handleOnClick },
        { text: 'Rename', Icon: PencilIcon, onClick: handleOnClick }
    ];
</script>

<li
    class="cursor-pointer transition-colors odd:bg-secondary-50 last-of-type:border-0 hover:bg-secondary-100/50 active:bg-secondary-100"
>
    <a
        {href}
        class="flex w-full items-center justify-between gap-2 border-b border-secondary-100 px-3 py-2"
        use:menu.trigger
    >
        <div class="flex w-full items-center gap-2">
            <File class="size-4" strokeWidth={2.5} />
            {@render name()}
        </div>
        <div class="flex items-center gap-4">
            <div class="w-11">
                <span
                    class="mx-auto flex size-6 items-center justify-center rounded-full bg-primary text-sm font-semibold uppercase text-white"
                >
                    {owner}
                </span>
            </div>
            <span class="hidden w-20 text-center text-xs md:block">
                {createdAt.toLocaleDateString()}
            </span>
            <Link2
                class={`size-4 rotate-45 ${!isShared ? 'text-secondary-200' : ''}`}
                strokeWidth={2.5}
            />
        </div></a
    >
</li>

<ContextMenu menu={menu.menu} options={cmOptions} />
