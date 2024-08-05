<script lang="ts">
    import { getSupabaseClient } from '@mstack/svelte-supabase';
    import { Button, Chip, ListItem } from '@mstack/ui';
    import { HEX_REGEX } from '@mstack/utils';

    import { createMutation, useQueryClient } from '@tanstack/svelte-query';
    import { Plus, Tag } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import { Keys } from '$lib/config';
    import { type Book, type NewTagData, createTag } from '$lib/db';

    import ListHeader from './list-header.svelte';
    import NewTagItem from './new-tag-item.svelte';

    type Props = { book: Book };
    let { book }: Props = $props();

    let queryClient = useQueryClient();
    let supabaseClient = getSupabaseClient();

    let newTag = $state(false);
    let name = $state('');
    let color = $state('#9d33dd');
    let canSubmit = $derived(name.length > 0 && HEX_REGEX.test(color));

    const handleOnAddTag = () => {
        newTag = true;
    };

    let newTagMutation = createMutation({
        mutationFn: async (data: NewTagData) => await createTag(supabaseClient, data),
        onSuccess: (data) => {
            if (!data) {
                return;
            }

            queryClient.setQueryData<Book>(Keys.BOOK(`${book.id}`), (book) => {
                // TS check only
                if (!book) {
                    return book;
                }

                const updated = { ...book };
                updated.tag = [...book.tag, data[0]];
                return updated;
            });
            queryClient.invalidateQueries({ queryKey: Keys.BOOK_TAGS(`${book.id}`) });
        }
    });

    const handleOnConfirmNewPage = () => {
        $newTagMutation.mutate(
            { book: book.id, name, color },
            {
                onSettled: () => {
                    newTag = false;
                }
            }
        );
    };
</script>

<ul>
    <ListHeader />
    {#each book.tag as tag (tag.id)}
        <ListItem class="flex w-full items-center justify-between px-3 py-2">
            <div class="flex w-full items-center gap-2">
                <Tag class="size-4" strokeWidth={2.5} />
                <span>{tag.name}</span>
            </div>
            <div class="flex shrink-0 items-center gap-4">
                <Chip color={tag.color}>{tag.name}</Chip>
                <span class="w-20 text-right text-sm uppercase">
                    {tag.color}
                </span>
                <div class="size-5 rounded" style="background-color: {tag.color}"></div>
            </div>
        </ListItem>
    {/each}
    {#if newTag}
        <NewTagItem bind:name bind:color />
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
                onclick={handleOnConfirmNewPage}
                disabled={!canSubmit}
            >
                Save tag
            </Button>
        </div>
    {/if}
</div>
