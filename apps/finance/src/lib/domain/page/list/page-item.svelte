<script lang="ts">
    import type { ContextMenuOption } from '@stack/ui';

    import type { Snippet } from 'svelte';

    import { ContextMenu, createContextMenu, ListItem } from '@stack/ui';

    import type { BooksWithPages } from '$lib/db';

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

    import { usePinnedPages } from './hooks';

    type Props = {
        name: Snippet;
        owner: string;
        isShared?: boolean;
    } & (
        | { createdAt: Date; page?: never }
        | { page: BooksWithPages[number]['page'][number]; createdAt?: never }
    );
    const { createdAt, isShared, name, owner, page }: Props = $props();

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

    const onClick = () => {
        // eslint-disable-next-line no-alert
        window.alert('Under development');
    };

    const onTogglePin = () => {
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
            onClick: onTogglePin,
            text: isPinned ? 'Unpin page' : 'Pin page'
        },
        { disabled: true, Icon: ClipboardCopyIcon, onClick, text: 'Copy' },
        { disabled: true, Icon: ClipboardPlusIcon, onClick, text: 'Duplicate' },
        { disabled: true, Icon: ClipboardPasteIcon, onClick, text: 'Paste' },
        { disabled: true, Icon: PencilIcon, onClick, text: 'Rename' }
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
