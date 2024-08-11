<script lang="ts">
    import type { Snippet } from 'svelte';

    import { ContextMenu, type ContextMenuOption, createContextMenu, ListItem } from '@mstack/ui';

    import {
        ClipboardCopyIcon,
        ClipboardPasteIcon,
        ClipboardPlusIcon,
        File,
        Link2,
        PencilIcon
    } from 'lucide-svelte';

    type Props = {
        createdAt: Date;
        href?: string;
        isShared?: boolean;
        name: Snippet;
        owner: string;
    };
    let { createdAt, href, isShared, name, owner }: Props = $props();

    let menu = createContextMenu();

    const handleOnClick = () => {
        window.alert('Under development');
    };

    const cmOptions: ContextMenuOption[] = [
        { Icon: ClipboardCopyIcon, onClick: handleOnClick, text: 'Copy' },
        { Icon: ClipboardPlusIcon, onClick: handleOnClick, text: 'Duplicate' },
        { Icon: ClipboardPasteIcon, onClick: handleOnClick, text: 'Paste' },
        { Icon: PencilIcon, onClick: handleOnClick, text: 'Rename' }
    ];
</script>

{#snippet content()}
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
            class={`size-4 rotate-45 ${!isShared ? 'text-surface-200' : ''}`}
            strokeWidth={2.5}
        />
    </div>
{/snippet}

{#if href}
    <ListItem hoverable>
        <a class="flex w-full items-center justify-between gap-2 px-3 py-2" use:menu.trigger {href}>
            {@render content()}
        </a>
    </ListItem>
{:else}
    <ListItem class="flex w-full items-center justify-between gap-2 px-3 py-2" hoverable>
        {@render content()}
    </ListItem>
{/if}

<ContextMenu menu={menu.menu} options={cmOptions} />
