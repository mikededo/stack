<script lang="ts">
    import { getSupabaseClient } from '@stack/supabase';
    import { Button, Dialog, Input } from '@stack/ui';

    import type { CreateProjectData } from '$lib/db';

    import { createMutation } from '@tanstack/svelte-query';

    import { page } from '$app/stores';
    import { containsParam } from '$lib/config';
    import { createProject } from '$lib/db';

    import { LanguageSelector } from '../language';
    import { useProjectDialog } from './project-dialog.svelte';

    const showDialog = $derived(containsParam($page.url.searchParams, 'dialog', 'create-project'));

    const supabaseClient = getSupabaseClient();
    const mutation = createMutation({
        mutationFn: async (args: CreateProjectData) =>
            await createProject(supabaseClient, args)
    });
    const {
        actions: {
            onChangeDefaultLanguage,
            onClose,
            onConfirm,
            onToggleLanguage
        },
        data,
        state
    } = useProjectDialog({
        onMutate: (data, { onSuccess }) => {
            $mutation.mutate(data, { onSuccess });
        }
    });
</script>

{#if showDialog}
    <Dialog onClose={onClose}>
        {#snippet header()}
            Create a project
        {/snippet}
        {#snippet footer()}
            <div class="flex items-center justify-end gap-2">
                <Button disabled={!state.name} form="create-project" type="submit">
                    Create
                </Button>
                <Button color="surface" onclick={onClose}>Cancel</Button>
            </div>
        {/snippet}

        <form class="flex w-full flex-col gap-4" id="create-project" onsubmit={onConfirm}>
            <Input
                bind:value={state.name}
                label="Name"
                name="name"
                placeholder="Project name"
            />
            <Input
                bind:value={state.description}
                label="Description (optional)"
                name="description"
                placeholder="Project description"
            />
            <Input
                bind:value={state.website}
                label="URL (optional)"
                name="website"
                placeholder="Website i18n"
            />
            <LanguageSelector
                disabled={data.isLoading}
                label="Project languages"
                languages={data.languages ?? []}
                name="projectLanguages"
                placeholder="Select the project languages"
                multiple
                onLanguageClick={onToggleLanguage}
            />
            <LanguageSelector
                disabled={!state.selectedLanguages.length}
                label="Default language"
                languages={[...state.selectedLanguages]}
                name="defaultLanguage"
                placeholder="Select the default language"
                onLanguageClick={onChangeDefaultLanguage}
            />
        </form>
    </Dialog>
{/if}
