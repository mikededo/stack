<script lang="ts">
    import { clickAway } from '@mstack/actions';
    import {
        Chip,
        ContextMenu,
        type ContextMenuOption,
        ListItem,
        createContextMenu
    } from '@mstack/ui';

    import { Layers2, Tag as TagIcon, Trash2 } from 'lucide-svelte';

    import type { Tag } from '$lib/db';

    import ColorInput from './color-input.svelte';
    import { isTagValid } from './helpers';
    import NameInput from './name-input.svelte';

    type Props = {
        tag: Tag;
        onUpdateTag: (tag: Tag) => void;
        onDeleteTag: (tag: Tag) => void;
        onDuplicateTag: (tag: Tag) => void;
    };
    let { tag, onUpdateTag, onDuplicateTag, onDeleteTag }: Props = $props();

    let menu = createContextMenu();
    let name = $state(tag.name);
    let color = $state(tag.color);
    let editMode = $state<'name' | 'color' | undefined>(undefined);

    const handleOnFwdTag = (fn: (tag: Tag) => void) => () => {
        fn(tag);
    };

    const options: ContextMenuOption[] = [
        { text: 'Duplicate', Icon: Layers2, onClick: handleOnFwdTag(onDuplicateTag) },
        { text: 'Delete', Icon: Trash2, onClick: handleOnFwdTag(onDeleteTag), destructive: true }
    ];

    const handleOnEditMode =
        (mode: typeof editMode = undefined) =>
        () => {
            editMode = mode;
            if (!mode) {
                name = tag.name;
                color = tag.color;
            }
        };

    const handleOnConfirm = () => {
        if (isTagValid(name, color)) {
            onUpdateTag({ ...tag, name, color });
            editMode = undefined;
        }
    };
</script>

<ListItem class="flex w-full items-center justify-between px-3 py-2" use={[menu.trigger]}>
    <div class="flex w-full items-center gap-2">
        <TagIcon
            class="size-4 transition-colors"
            strokeWidth={2.5}
            style="stroke: {editMode ? color : 'inherit'}"
        />
        {#if editMode}
            <NameInput
                bind:value={name}
                onConfirm={handleOnConfirm}
                onCancel={handleOnEditMode()}
                autofocus={editMode === 'name'}
                use={[[clickAway, handleOnEditMode()]]}
            />
        {:else}
            <button class="cursor-text outline-none" onclick={handleOnEditMode('name')}>
                {tag.name}
            </button>
        {/if}
    </div>
    <div class="flex shrink-0 items-center gap-4">
        <Chip {color}>{tag.name}</Chip>
        {#if editMode}
            <ColorInput
                bind:value={color}
                onConfirm={handleOnConfirm}
                onCancel={handleOnEditMode()}
                autofocus={editMode === 'color'}
                use={[[clickAway, handleOnEditMode()]]}
            />
        {:else}
            <button
                class="w-20 cursor-text text-right text-sm uppercase outline-none"
                onclick={handleOnEditMode('color')}
            >
                {tag.color}
            </button>
        {/if}
        <div class="size-5 rounded" style="background-color: {color}"></div>
    </div>
</ListItem>

<ContextMenu menu={menu.menu} {options} />
