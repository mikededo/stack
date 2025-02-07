<script lang="ts">
    import type { ContextMenuOption } from '@stack/ui';

    import { clickAway } from '@stack/actions';
    import {
        Chip,
        ContextMenu,

        createContextMenu,
        ListItem
    } from '@stack/ui';

    import type { Tag } from '$lib/db';

    import { Layers2, Tag as TagIcon, Trash2 } from 'lucide-svelte';

    import ColorInput from './color-input.svelte';
    import { isTagValid } from './helpers';
    import NameInput from './name-input.svelte';

    type Props = {
        tag: Tag;
        onDeleteTag: (tag: Tag) => void;
        onDuplicateTag: (tag: Tag) => void;
        onUpdateTag: (tag: Tag) => void;
    };
    const { onDeleteTag, onDuplicateTag, onUpdateTag, tag }: Props = $props();

    const menu = createContextMenu();
    let name = $state(tag.name);
    let color = $state(tag.color);
    let editMode = $state<'color' | 'name' | undefined>(undefined);

    const onFwdTag = (fn: (tag: Tag) => void) => () => {
        fn(tag);
    };

    const options: ContextMenuOption[] = [
        { Icon: Layers2, onClick: onFwdTag(onDuplicateTag), text: 'Duplicate' },
        { destructive: true, Icon: Trash2, onClick: onFwdTag(onDeleteTag), text: 'Delete' }
    ];

    const onEditMode =
        (mode: typeof editMode = undefined) =>
            () => {
                editMode = mode;
                if (!mode) {
                    name = tag.name;
                    color = tag.color;
                }
            };

    const onConfirm = () => {
        if (isTagValid(name, color)) {
            onUpdateTag({ ...tag, color, name });
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
                autofocus={editMode === 'name'}
                use={[[clickAway, onEditMode()]]}
                onCancel={onEditMode()}
                {onConfirm}
            />
        {:else}
            <button class="cursor-text outline-hidden" onclick={onEditMode('name')}>
                {tag.name}
            </button>
        {/if}
    </div>
    <div class="flex shrink-0 items-center gap-4">
        <Chip {color}>{tag.name}</Chip>
        {#if editMode}
            <ColorInput
                bind:value={color}
                autofocus={editMode === 'color'}
                use={[[clickAway, onEditMode()]]}
                onCancel={onEditMode()}
                {onConfirm}
            />
        {:else}
            <button
                class="w-20 cursor-text text-right text-sm uppercase outline-hidden"
                onclick={onEditMode('color')}
            >
                {tag.color}
            </button>
        {/if}
        <div class="size-5 rounded" style="background-color: {color}"></div>
    </div>
</ListItem>

<ContextMenu menu={menu.menu} {options} />
