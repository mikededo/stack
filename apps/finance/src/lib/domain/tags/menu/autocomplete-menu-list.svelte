<script lang="ts">
    import { MenuOption } from '@stack/ui';

    import { Circle, CircleCheck } from 'lucide-svelte';

    import type { Tag } from '$lib/db';

    import { useInputMenuOption } from './autocomplete-menu-list';
    import { useTagList } from './tag-list.svelte';

    type Props = {
        book: string;
        filterTags: (tag: Tag) => boolean;
        inputRef: HTMLInputElement | undefined;
        isTagActive: (tag: number) => boolean;
        onClick: (tag: number) => void;
        onHideAutocomplete: () => void;
    };
    let { book, filterTags, inputRef, isTagActive, onClick, onHideAutocomplete }: Props = $props();

    const { tags, tagsQuery } = useTagList({ book, filterTags });

    const getMenuOptions = (tag: Tag) => ({
        inputRef,
        onHideAutocomplete,
        onValueChange: onClick,
        value: tag
    });
</script>

{#if $tagsQuery.data}
    {#each tags as tag (tag.id)}
        <div class="w-full" style="--tag-color: {tag.color}; --tag-color-hover: {tag.color}22;">
            <MenuOption
                class="tag text-[var(--tag-color)] aria-current:bg-[var(--tag-color-hover)] hover:bg-[var(--tag-color-hover)] focus:bg-[var(--tag-color-hover)]"
                active={isTagActive?.(tag.id)}
                Icon={isTagActive?.(tag.id) ? CircleCheck : Circle}
                label={tag.name}
                use={[[useInputMenuOption, getMenuOptions(tag)]]}
                unstyled
            />
        </div>
    {/each}
{/if}
