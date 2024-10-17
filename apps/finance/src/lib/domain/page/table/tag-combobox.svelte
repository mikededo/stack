<script lang="ts">
    import { useActions } from '@stack/actions';
    import { Chip, Combobox } from '@stack/ui';

    import type { Tag } from '$lib/db';

    import { TagAutocompleteMenuList } from '$lib/domain/tags';
    import { useExpenseTagsModifiers } from '$lib/hooks';

    import { getPageBookId, getPageId } from './context.svelte';

    type Props = { tags: Tag[]; expenseId?: null | number };
    const { expenseId, tags }: Props = $props();

    const book = getPageBookId();
    const page = getPageId();

    const inputRef = $state<HTMLInputElement>();
    let value = $state('');
    const selectedTags = $derived(new Set(tags.map(({ id }) => id)));
    const filterTags = $derived(
        (tag: Tag) => (
            value.length === 0 || tag.name.toLowerCase().includes(value.toLowerCase())
        ) && !selectedTags.has(tag.id)
    );
    const { add, remove } = useExpenseTagsModifiers({ book, page });

    // There will never be loads of tags, so we can just iterate over them
    const isTagActive = (tag: number) => tags.some(({ id }) => id === tag);

    const onBackspacePress = () => {
        if (!tags.length || !expenseId || value.length) {
            return;
        }

        $remove.mutate({ expense: expenseId, tag: tags[tags.length - 1].id });
    };

    const onDeleteTag = (tag: number) => () => {
        if (!expenseId) {
            return;
        }

        $remove.mutate({ expense: expenseId, tag });
    };

    const onToggleTag = (tag: number) => {
        if (!expenseId) {
            return;
        }

        if (tags.find(({ id }) => id === tag)) {
            onDeleteTag(tag)();
        } else {
            $add.mutate({ expense: expenseId, tag });
        }
    };

</script>

<Combobox
    bind:value
    show={!!book}
    {inputRef}
    {onBackspacePress}
>
    {#snippet selectedOptions()}
        {#each tags as tag (tag.id)}
            <Chip color={tag.color} onClick={onDeleteTag(tag.id)}>{tag.name}</Chip>
        {/each}
    {/snippet}
    {#snippet input(args)}
        <input
            class="w-full min-w-12 flex-1 outline-none group-hover:bg-primary-50 group-aria-current:bg-primary-50 hover:bg-primary-50"
            bind:this={args.ref}
            bind:value={args.value}
            use:useActions={args.use}
        />
    {/snippet}

    {#snippet options()}
        <TagAutocompleteMenuList
            book={`${book}`}
            {filterTags}
            {inputRef}
            {isTagActive}
            onClick={onToggleTag}
        />
    {/snippet}
</Combobox>

