<script lang="ts">
    import { MenuOption } from '@stack/ui';

    import type { Tag } from '$lib/db';

    import { Circle, CircleCheck } from 'lucide-svelte';

    import { useBookTags } from '$lib/hooks';

    import { useInputMenuOption } from './autocomplete-menu-list';

    type Props = {
        book: string;
        filterTags: (tag: Tag) => boolean;
        inputRef: HTMLInputElement | undefined;
        isTagActive: (tag: number) => boolean;
        onClick: (tag: number) => void;
    };
    const { book, filterTags, inputRef, isTagActive, onClick }: Props = $props();

    const tagsQuery = useBookTags(book);
    const filteredTags = $derived.by(() => {
        if (!$tagsQuery.data) {
            return [];
        }

        return $tagsQuery.data.filter(filterTags);
    });
    const menuOptions = $derived({ inputRef, onValueChange: onClick });

    $inspect(filteredTags);
</script>

{#if $tagsQuery.data}
    {#if filteredTags.length}
        {#each filteredTags as tag (tag.id)}
            <div class="w-full" style="--tag-color: {tag.color}; --tag-color-hover: {tag.color}22;">
                <MenuOption
                    class="tag text-[var(--tag-color)] aria-current:bg-white hover:bg-[var(--tag-color-hover)] focus:bg-[var(--tag-color-hover)]"
                    active={isTagActive?.(tag.id)}
                    Icon={isTagActive?.(tag.id) ? CircleCheck : Circle}
                    label={tag.name}
                    use={[[useInputMenuOption, { ...menuOptions, value: tag }]]}
                    unstyled
                />
            </div>
        {/each}
    {:else}
        <div class="h-9 w-full flex items-center px-3 gap-1">
            <p class="text-sm text-surface-800">No tags matching your input!</p>
        </div>
    {/if}
{/if}
