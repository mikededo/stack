<script lang="ts">
    import { getSupabaseClient } from '@mstack/svelte-supabase';
    import { Button, DangerDialog } from '@mstack/ui';

    import { useQueryClient } from '@tanstack/svelte-query';
    import { Plus } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import { type Book, type Tag } from '$lib/db';

    import { isTagValid } from './helpers';
    import ListHeader from './list-header.svelte';
    import TagListItem from './list-item.svelte';
    import { useTagMutations } from './mutations';
    import NewTagItem from './new-tag-item.svelte';

    type Props = { book: Book };
    let { book }: Props = $props();

    let queryClient = useQueryClient();
    let supabaseClient = getSupabaseClient();

    let newTag = $state(false);
    let name = $state('');
    let color = $state('#9d33dd');
    let canSubmit = $derived(isTagValid(name, color));
    let confirmDelete = $state<Tag | undefined>();

    let mutationArgs = {
        bookId: `${book.id}`,
        onSettled: () => {
            newTag = false;
        },
        queryClient,
        supabaseClient
    };
    const { createTagMutation, deleteTagMutation, updateTagMutation } =
        useTagMutations(mutationArgs);

    const handleOnAddTag = () => {
        newTag = true;
    };

    const handleOnCreateNewTag = () => {
        $createTagMutation.mutate({ book: book.id, color, name });
    };

    const handleOnDuplicateTag = (tag: Tag) => {
        $createTagMutation.mutate({ book: book.id, color: tag.color, name: `${tag.name} (copy)` });
    };

    const handleOnCancelNewTag = () => {
        newTag = false;
    };

    const handleOnUpdateTag = (tag: Tag) => {
        $updateTagMutation.mutate(tag);
    };

    const handleOnConfirmDelete = (tag: Tag) => {
        confirmDelete = tag;
    };

    const handleOnCancelDelete = () => {
        confirmDelete = undefined;
    };

    const handleOnDeleteTag = () => {
        if (confirmDelete) {
            $deleteTagMutation.mutate(confirmDelete.id);
            confirmDelete = undefined;
        }
    };
</script>

<ul>
    <ListHeader />
    {#each book.tag as tag (tag.id)}
        <TagListItem
            {tag}
            onDeleteTag={handleOnConfirmDelete}
            onDuplicateTag={handleOnDuplicateTag}
            onUpdateTag={handleOnUpdateTag}
        />
    {/each}
    {#if newTag}
        <NewTagItem
            bind:color
            bind:name
            onCancel={handleOnCancelNewTag}
            onConfirm={handleOnCreateNewTag}
        />
    {/if}
</ul>

<div class="flex items-center gap-2 py-2">
    <Button
        class="flex cursor-pointer items-center gap-2 px-3 py-2 transition-colors"
        color="muted"
        disabled={newTag}
        onclick={handleOnAddTag}
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
                onclick={handleOnCreateNewTag}
            >
                Save tag
            </Button>
        </div>
    {/if}
</div>

{#if confirmDelete}
    <DangerDialog onCancel={handleOnCancelDelete} onConfirm={handleOnDeleteTag} />
{/if}
