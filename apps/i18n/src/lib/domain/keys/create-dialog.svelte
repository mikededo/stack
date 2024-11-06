<script lang="ts">
    import { getSupabaseClient } from '@stack/supabase';
    import { Button, Dialog, Input } from '@stack/ui';

    import { createMutation, useQueryClient } from '@tanstack/svelte-query';

    import { page } from '$app/stores';
    import { gotoWithParams, hasParam, Keys } from '$lib/config';
    import { createKey, type Project, type ProjectKeys } from '$lib/db';

    type Props = { project: Project['id'] };
    const { project }: Props = $props();

    const supabaseClient = getSupabaseClient();
    const showDialog = $derived(hasParam($page.url, ['dialog', 'create-key']) && project);
    let key = $state('');

    const queryClient = useQueryClient();
    const mutation = createMutation({
        mutationFn: () => createKey(supabaseClient, { key, project })
    });

    const handleOnClose = () => {
        gotoWithParams({ dialog: undefined });

        key = '';
    };

    const handleOnCreate = () => {
        // TODO: Add create another one
        // TODO: If not create another one, redirect to editor
        $mutation.mutate(undefined, {
            onSuccess: (data) => {
                if (!data) {
                    return;
                }

                const projectStr = `${project}`;
                queryClient.setQueryData<ProjectKeys>(Keys.PROJECT(projectStr), (prev) => {
                    if (!prev) {
                        queryClient.invalidateQueries({ queryKey: Keys.PROJECT(projectStr) });
                        return;
                    }

                    const key = data[0];
                    const updated = { ...prev };
                    updated.keys = [...updated.keys, { ...key, translations: [] }];
                    return updated;
                });

                handleOnClose();
            }
        });
    };
</script>

{#if showDialog}
    <Dialog onClose={handleOnClose}>
        {#snippet header()}Create a translation{/snippet}
        {#snippet footer()}
            <div class="flex items-center justify-end gap-2">
                <Button disabled={!key} onclick={handleOnCreate}>Create</Button>
                <Button color="surface" onclick={handleOnClose}>Cancel</Button>
            </div>
        {/snippet}

        <Input
            class="mb-1"
            bind:value={key}
            label="Key"
            name="key"
            placeholder="Unique phrase key..."
        />
    </Dialog>
{/if}
