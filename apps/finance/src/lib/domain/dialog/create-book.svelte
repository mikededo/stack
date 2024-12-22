<script lang="ts">
    import { Button, Dialog, Input, TextIconButton } from '@stack/ui';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { pathTo } from '$lib/config';
    import { useCreateBook } from '$lib/hooks';
    import { Save } from 'lucide-svelte';

    import { hideDialog } from './dialog';

    const createBookMutation = useCreateBook();

    let name = $state('');
    const params = $derived($page.url.searchParams);
    const show = $derived(params.get('dialog') === 'create-book');

    const onCancel = () => {
        hideDialog();
    };

    const onConfirm = () => {
        $createBookMutation.mutate(name, {
            onSuccess: (data) => {
                // TS check only
                if (!data) {
                    return;
                }

                goto(pathTo('book', { book: `${data[0].id}` }));
                name = '';
            }
        });
    };
</script>

{#if show}
    <Dialog onClose={onCancel}>
        {#snippet header()}
            <span>Create a new book</span>
        {/snippet}
        {#snippet footer()}
            <div class="flex justify-end gap-2">
                <Button color="muted" onclick={onCancel}>Cancel</Button>
                <TextIconButton
                    color="primary"
                    disabled={!name}
                    Icon={Save}
                    label="Create"
                    onclick={onConfirm}
                />
            </div>
        {/snippet}

        <Input class="w-full text-sm" bind:value={name} placeholder="Book name..." />
    </Dialog>
{/if}
