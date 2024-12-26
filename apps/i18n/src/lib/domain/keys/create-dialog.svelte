<script lang="ts">
    import { getSupabaseClient } from '@stack/supabase';
    import { Button, Checkbox, Dialog, Input } from '@stack/ui';

    import { createMutation, useQueryClient } from '@tanstack/svelte-query';

    import { page } from '$app/stores';
    import { gotoWithParams, hasParam, Keys } from '$lib/config';
    import { createKey, type Project, type ProjectKeys } from '$lib/db';

    type Props = { project: Project['id'] };
    const { project }: Props = $props();

    const supabaseClient = getSupabaseClient();
    const showDialog = $derived(hasParam($page.url, ['dialog', 'create-key']) && project);
    let inputRef = $state<HTMLInputElement>();
    let key = $state('');
    let description = $state('');
    let createAnother = $state(false);

    const queryClient = useQueryClient();
    const mutation = createMutation({
        mutationFn: () => createKey(supabaseClient, { description, key, project })
    });

    const handleOnClose = () => {
        gotoWithParams({ dialog: undefined });

        key = '';
    };

    const handleOnCreate = () => {
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

                if (createAnother) {
                    key = '';
                    inputRef?.focus();
                } else {
                    handleOnClose();
                }
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

        <div class="flex flex-col gap-2.5 mb-1">
            <Input
                bind:ref={inputRef}
                bind:value={key}
                label="Key"
                name="key"
                placeholder="Unique phrase key..."
            />
            <Input
                bind:value={description}
                label="Description"
                name="description"
                placeholder="Optional key descrption"
            />
            <Checkbox
                bind:checked={createAnother}
                label="Create another key?"
                labelPosition="right"
                name="create-another-key"
            />
        </div>
    </Dialog>
{/if}
