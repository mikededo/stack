<script lang="ts">
    import { getSupabaseClient } from '@stack/supabase';
    import { Button, DangerDialog } from '@stack/ui';
    import { useQueryClient } from '@tanstack/svelte-query';
    import { type Book, type Tag } from '$lib/db';
    import { Plus } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import { isTagValid } from './helpers';
    import ListHeader from './list-header.svelte';
    import TagListItem from './list-item.svelte';
    import { useTagMutations } from './mutations';
    import NewTagItem from './new-tag-item.svelte';

    type Props = { book: Book };
    const { book }: Props = $props();

    const queryClient = useQueryClient();
    const supabaseClient = getSupabaseClient();

    let newTag = $state(false);
    let name = $state('');
    let color = $state('#9d33dd');
    const canSubmit = $derived(isTagValid(name, color));
    let confirmDelete = $state<Tag | undefined>();

    const mutationArgs = {
        bookId: `${book.id}`,
        onSettled: () => {
            newTag = false;
        },
        queryClient,
        supabaseClient
    };
    const { createTagMutation, deleteTagMutation, updateTagMutation } =
        useTagMutations(mutationArgs);

    const onAddTag = () => {
        newTag = true;
    };

    const onCreateNewTag = () => {
        $createTagMutation.mutate({ book: book.id, color, name });
    };

    const onDuplicateTag = (tag: Tag) => {
        $createTagMutation.mutate({ book: book.id, color: tag.color, name: `${tag.name} (copy)` });
    };

    const onCancelNewTag = () => {
        newTag = false;
    };

    const onUpdateTag = (tag: Tag) => {
        $updateTagMutation.mutate(tag);
    };

    const onConfirmDelete = (tag: Tag) => {
        confirmDelete = tag;
    };

    const onCancelDelete = () => {
        confirmDelete = undefined;
    };

    const onDeleteTag = () => {
        if (confirmDelete) {
            $deleteTagMutation.mutate(confirmDelete.id);
            confirmDelete = undefined;
        }
    };
</script>

<ul>
    <ListHeader />
    {#each book.tag as tag (tag.id)}
        <TagListItem {tag}
            onDeleteTag={onConfirmDelete}
            {onDuplicateTag}
            {onUpdateTag}
        />
    {/each}
    {#if newTag}
        <NewTagItem bind:color
            bind:name
            onCancel={onCancelNewTag}
            onConfirm={onCreateNewTag}
        />
    {/if}
</ul>

<div class="flex items-center gap-2 py-2">
    <Button
        class="flex cursor-pointer items-center gap-2 px-3 py-2 transition-colors"
        color="muted"
        disabled={newTag}
        onclick={onAddTag}
    >
        <Plus class="size-4" strokeWidth={2.5} />
        <span>New tag</span>
    </Button>
    {#if newTag}
        <div transition:fade={{ duration: 100 }}>
            <Button
                class="flex cursor-pointer items-center gap-2 px-3 py-2 transition-colors"
                color="primary"
                disabled={!canSubmit}
                onclick={onCreateNewTag}
            >
                Save tag
            </Button>
        </div>
    {/if}
</div>

{#if confirmDelete}
    <DangerDialog onCancel={onCancelDelete} onConfirm={onDeleteTag} />
{/if}
