<script lang="ts">
    import { MenuOption } from '@stack/ui';

    import { Circle, CircleCheck } from 'lucide-svelte';

    import { useBookTags } from '$lib/hooks';

    type Props = {
        book: string;
        isTagActive: (tag: number) => boolean;
        onClick: (tag: number) => void;
    };
    let { book, isTagActive, ...restProps }: Props = $props();

    const tagsQuery = useBookTags(book);

    const onClick = (id: number) => () => {
        restProps.onClick(id);
    };
</script>

{#if $tagsQuery.data}
    {#each $tagsQuery.data as tag (tag.id)}
        <div class="w-full" style="--tag-color: {tag.color}; --tag-color-hover: {tag.color}22;">
            <MenuOption
                class="tag text-[var(--tag-color)] aria-current:bg-[var(--tag-color-hover)] hover:bg-[var(--tag-color-hover)] focus:bg-[var(--tag-color-hover)]"
                active={isTagActive?.(tag.id)}
                Icon={isTagActive?.(tag.id) ? CircleCheck : Circle}
                label={tag.name}
                unstyled
                onClick={onClick(tag.id)}
            />
        </div>
    {/each}
{/if}
