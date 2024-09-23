<script lang="ts">
    import type { FloatingCardPosition } from '@stack/ui';

    import type { Action } from 'svelte/action';

    import { portal, useTrapFocus } from '@stack/actions';
    import { Chip, FloatingCard } from '@stack/ui';
    import { getFocusableElements, Keys } from '@stack/utils';

    import type { Tag } from '$lib/db';

    import { TagAutocompleteMenuList } from '$lib/domain/tags';
    import { useExpenseTagsModifiers } from '$lib/hooks';

    import { getPageBookId, getPageId } from './context.svelte';

    type Props = { tags: Tag[]; expenseId?: null | number };
    const { expenseId, tags }: Props = $props();

    const book = getPageBookId();
    const page = getPageId();

    let containerRef = $state<HTMLDivElement>();
    let popupRef = $state<HTMLDivElement>();
    let inputRef = $state<HTMLInputElement>();
    let value = $state('');
    let show = $state(false);
    let position = $state<FloatingCardPosition | undefined>();
    const selectedTags = $derived(new Set(tags.map(({ id }) => id)));
    const filterTags = $derived(
        (tag: Tag) => {
            return (
                value.length === 0 || tag.name.toLowerCase().includes(value.toLowerCase())
            ) && !selectedTags.has(tag.id);
        }
    );
    const { add, remove } = useExpenseTagsModifiers({ book, page });

    $effect(() => {
        // Force update on tags update
      // eslint-disable-next-line no-unused-expressions
        tags;

        if (!containerRef) {
            return;
        }

        const client = containerRef.getBoundingClientRect();

        position = {
            left: client.x,
            top: client.y + client.height + 4,
            width: client.width
        };
    });

    // There will never be loads of tags, so we can just iterate over them
    const isTagActive = (tag: number) => tags.some(({ id }) => id === tag);

    const onHideAutocomplete = () => {
        show = false;
    };

    const useInput: Action = (node) => {
        const onKeydown = (event: KeyboardEvent) => {
            // Keystrokes that are not related with the pop up
            if (event.key === Keys.Backspace) {
                if (!tags.length || !expenseId || value.length) {
                    return;
                }

                $remove.mutate({ expense: expenseId, tag: tags[tags.length - 1].id });
            }

            if (!popupRef) {
                return;
            }

            const focusableElements = getFocusableElements(popupRef);
            if (!focusableElements.length) {
                return;
            }
            // Keystrokes that are related with the pop up
            if (event.key === Keys.ArrowDown) {
                focusableElements[0].focus();
                event.preventDefault();
            } else if (event.key === Keys.ArrowUp) {
                focusableElements[focusableElements.length - 1].focus();
                event.preventDefault();
            }
        };

        const onFocus = () => {
            show = true;
        };

        node.addEventListener('keydown', onKeydown);
        node.addEventListener('focus', onFocus);

        node.focus();
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

<div class="flex flex-wrap items-center gap-1" bind:this={containerRef} use:useTrapFocus>
    {#each tags as tag (tag.id)}
        <Chip color={tag.color} onClick={onDeleteTag(tag.id)}>{tag.name}</Chip>
    {/each}
    <input
        class="w-full min-w-12 flex-1 outline-none group-hover:bg-primary-50 group-aria-current:bg-primary-50 hover:bg-primary-50"
        bind:this={inputRef}
        bind:value
        use:useInput
    />
</div>

{#if show && book}
    <!-- Max height set to 156 as each menu option is 36 + y padding + gap -->
    <FloatingCard
        class="max-h-[156px] overflow-y-auto"
        bind:ref={popupRef}
        role="menu"
        tabindex={1}
        use={[[portal, ''], useTrapFocus]}
        {position}
    >
        <TagAutocompleteMenuList
            book={`${book}`}
            {filterTags}
            {inputRef}
            {isTagActive}
            onClick={onToggleTag}
            {onHideAutocomplete}
        />
    </FloatingCard>
{/if}
