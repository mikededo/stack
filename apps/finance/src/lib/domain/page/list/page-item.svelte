<script context="module" lang="ts">
    type Props = {
        isShared?: boolean;
        name: Snippet;
        owner: string;
    } & (
        | { createdAt: Date; page?: never }
        | { createdAt?: never; page: BooksWithPages[number]['page'][number] }
    );
</script>

<script lang="ts">
    import type { Snippet } from 'svelte';

    import { ContextMenu, type ContextMenuOption, createContextMenu, ListItem } from '@mstack/ui';

    import {
        ClipboardCopyIcon,
        ClipboardPasteIcon,
        ClipboardPlusIcon,
        File,
        Link2,
        PencilIcon,
        Pin,
        PinOff
    } from 'lucide-svelte';

    import type { BooksWithPages } from '$lib/db';

    import { usePinnedPages } from './hooks';

    let { createdAt, isShared, name, owner, page }: Props = $props();

    let isPinned = $state(false);

    const menu = createContextMenu();
    const { pin, query: pinnedPages, unpin } = usePinnedPages();
    pinnedPages.subscribe(({ data, isLoading }) => {
        if (!page) {
            return;
        }

        if ((!data || isLoading) && isPinned) {
            isPinned = false;
        }

        isPinned = !!data?.some(({ page: current }) => current?.id === page.id);
    });

    const handleOnClick = () => {
        window.alert('Under development');
    };

    const handleOnTogglePin = () => {
        if (!page) {
            return;
        }

        if (isPinned) {
            $unpin.mutate(page.id);
        } else {
            $pin.mutate(page.id);
        }
    };

    const cmOptions: ContextMenuOption[] = $derived([
        {
            Icon: isPinned ? PinOff : Pin,
            onClick: handleOnTogglePin,
            text: isPinned ? 'Unpin page' : 'Pin page'
        },
        { disabled: true, Icon: ClipboardCopyIcon, onClick: handleOnClick, text: 'Copy' },
        { disabled: true, Icon: ClipboardPlusIcon, onClick: handleOnClick, text: 'Duplicate' },
        { disabled: true, Icon: ClipboardPasteIcon, onClick: handleOnClick, text: 'Paste' },
        { disabled: true, Icon: PencilIcon, onClick: handleOnClick, text: 'Rename' }
    ]);
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
            {#if page}
                {new Date(page.created_at).toLocaleDateString()}
            {:else if createdAt}
                {createdAt.toLocaleDateString()}
            {/if}
        </span>
        <Link2
            class={`size-4 rotate-45 ${!isShared ? 'text-surface-200' : ''}`}
            strokeWidth={2.5}
        />
    </div>
{/snippet}

{#if page}
    <ListItem hoverable>
        <a
            class="flex w-full items-center justify-between gap-2 px-3 py-2"
            use:menu.trigger
            href={`/app/${page.book_id}/${page.id}`}
        >
            {@render content()}
        </a>
    </ListItem>
    <ContextMenu menu={menu.menu} options={cmOptions} />
{:else}
    <ListItem class="flex w-full items-center justify-between gap-2 px-3 py-2" hoverable>
        {@render content()}
    </ListItem>
{/if}
