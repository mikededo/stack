<script lang="ts">
    import {
        Chip,
        ContextMenu,
        type ContextMenuOption,
        ListItem,
        createContextMenu
    } from '@mstack/ui';

    import { Layers2, Tag as TagIcon, Trash2 } from 'lucide-svelte';

    import type { Tag } from '$lib/db';

    type Props = {
        tag: Tag;
        onDeleteTag: (tag: Tag) => void;
        onDuplicateTag: (tag: Tag) => void;
    };
    let { tag, onDuplicateTag, onDeleteTag }: Props = $props();

    let menu = createContextMenu();

    const handleOnFwdTag = (fn: (tag: Tag) => void) => () => {
        fn(tag);
    };

    const options: ContextMenuOption[] = [
        { text: 'Duplicate', Icon: Layers2, onClick: handleOnFwdTag(onDuplicateTag) },
        { text: 'Delete', Icon: Trash2, onClick: handleOnFwdTag(onDeleteTag), destructive: true }
    ];
</script>

<ListItem class="flex w-full items-center justify-between px-3 py-2" use={[menu.trigger]}>
    <div class="flex w-full items-center gap-2">
        <TagIcon class="size-4" strokeWidth={2.5} />
        <span>{tag.name}</span>
    </div>
    <div class="flex shrink-0 items-center gap-4">
        <Chip color={tag.color}>{tag.name}</Chip>
        <span class="w-20 text-right text-sm uppercase">
            {tag.color}
        </span>
        <div class="size-5 rounded" style="background-color: {tag.color}"></div>
    </div>
</ListItem>

<ContextMenu menu={menu.menu} {options} />
