<script lang="ts">
    import { getSupabaseClient } from '@mstack/svelte-supabase';
    import { Button } from '@mstack/ui';

    import { useQueryClient } from '@tanstack/svelte-query';
    import { Plus } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import { type Book, type Tag } from '$lib/db';

    import { isTagValid } from './helpers';
    import ListHeader from './list-header.svelte';
    import TagListItem from './list-item.svelte';
    import { useCreateTag, useDeleteTag } from './mutations';
    import NewTagItem from './new-tag-item.svelte';

    type Props = { book: Book };
    let { book }: Props = $props();

    let queryClient = useQueryClient();
    let supabaseClient = getSupabaseClient();

    let newTag = $state(false);
    let name = $state('');
    let color = $state('#9d33dd');
    let canSubmit = $derived(isTagValid(name, color));

    let mutationArgs = {
        bookId: `${book.id}`,
        supabaseClient,
        queryClient,
        onSettled: () => {
            newTag = false;
        }
    };
    const newTagMutation = useCreateTag(mutationArgs);
    const deleteTagMutation = useDeleteTag(mutationArgs);

    const handleOnAddTag = () => {
        newTag = true;
    };

    const handleOnCreateNewTag = () => {
        $newTagMutation.mutate({ book: book.id, name, color });
    };

    const handleOnCancelNewTag = () => {
        newTag = false;
    };

    const handleOnDuplicateTag = (tag: Tag) => {
        $newTagMutation.mutate({ book: book.id, name: `${tag.name} (copy)`, color: tag.color });
    };

    const handleOnDeleteTag = (tag: Tag) => {
        $deleteTagMutation.mutate(tag.id);
    };
</script>

<ul>
    <ListHeader />
    {#each book.tag as tag (tag.id)}
        <TagListItem {tag} onDeleteTag={handleOnDeleteTag} onDuplicateTag={handleOnDuplicateTag} />
    {/each}
    {#if newTag}
        <NewTagItem
            bind:name
            bind:color
            onConfirm={handleOnCreateNewTag}
            onCancel={handleOnCancelNewTag}
        />
    {/if}
</ul>
<div class="flex items-center gap-2 py-2">
    <Button
        class="flex cursor-pointer items-center gap-2 px-3 py-2 transition-colors"
        color="muted"
        onclick={handleOnAddTag}
        disabled={newTag}
    >
        <Plus class="size-4" strokeWidth={2.5} />
        <span>New tag</span>
    </Button>
    {#if newTag}
        <div transition:fade={{ duration: 100 }}>
            <Button
                class="flex cursor-pointer items-center gap-2 px-3 py-2 transition-colors"
                color="primary"
                onclick={handleOnCreateNewTag}
                disabled={!canSubmit}
            >
                Save tag
            </Button>
        </div>
    {/if}
</div>
