<script lang="ts">
    import { getSupabaseClient } from '@stack/supabase';
    import { Button, Dialog, Input } from '@stack/ui';

    import type { CreateProjectData, Languages } from '$lib/db';

    import { createMutation, useQueryClient } from '@tanstack/svelte-query';

    import { page } from '$app/stores';
    import { containsParam, deleteParam, Keys, pathTo } from '$lib/config';
    import { createProject } from '$lib/db';

    import { LanguageSelector } from '../language';

    type FormState = {
        defaultLanguage: string;
        description: string;
        name: string;
        selectedLanguages: Languages[number][];
        website: string;
    };
    type Props = { languages: Languages; loading?: boolean };
    const { languages, loading }: Props = $props();

    const supabaseClient = getSupabaseClient();
    let {
        defaultLanguage,
        description,
        name,
        selectedLanguages,
        website
    } = $state<FormState>({
        defaultLanguage: '',
        description: '',
        name: '',
        selectedLanguages: [],
        website: ''
    });

    const showDialog = $derived(containsParam($page.url.searchParams, 'dialog', 'createProject'));

    const queryClient = useQueryClient();
    const mutation = createMutation({
        mutationFn: async (args: CreateProjectData) =>
            await createProject(supabaseClient, args)
    });

    const onClose = (_?: Event, id?: number) => {
        // If there's an id, we redirect to the newly created project
        const pathname = id ? pathTo('project', { project: `${id}` }) : undefined;
        deleteParam('dialog', { pathname });

        name = '';
        website = '';
    };

    const onCreate = (e: Event) => {
        e.preventDefault();
        if (!name || selectedLanguages.length === 0 || !defaultLanguage) {
            // TODO: Display error
            return;
        }

        const args: CreateProjectData = {
            defaultLanguageId: +defaultLanguage,
            description,
            languageIds: selectedLanguages.map(({ id }) => id),
            name,
            websiteUrl: website
        };
        $mutation.mutate(args, {
            onSuccess: (id) => {
                if (!id) {
                    return;
                }

                queryClient.invalidateQueries({ queryKey: Keys.PROJECTS });
                onClose(undefined, id);
            }
        });
    };

    const onChangeSelected = (language: Languages[number]) => {
        const updated = [...selectedLanguages];
        const iof = selectedLanguages.findIndex(({ id }) => id === language.id);
        if (iof !== -1) {
            updated.splice(iof, 1);
        } else {
            updated.push(language);
        }
        selectedLanguages = updated;
    };

    const onChangeDefault = ({ id }: Languages[number]) => {
        defaultLanguage = `${id}`;
    };
</script>

{#if showDialog}
    <Dialog onClose={onClose}>
        {#snippet header()}
            Create a project
        {/snippet}
        {#snippet footer()}
            <div class="flex items-center justify-end gap-2">
                <Button disabled={!name} form="create-project" type="submit">
                    Create
                </Button>
                <Button color="surface" onclick={onClose}>Cancel</Button>
            </div>
        {/snippet}

        <form class="flex w-full flex-col gap-4" id="create-project" onsubmit={onCreate}>
            <Input
                bind:value={name}
                label="Name"
                name="name"
                placeholder="Project name"
            />
            <Input
                bind:value={description}
                label="Description (optional)"
                name="description"
                placeholder="Project description"
            />
            <Input
                bind:value={website}
                label="URL (optional)"
                name="website"
                placeholder="Website i18n"
            />
            <LanguageSelector
                disabled={loading}
                label="Project languages"
                languages={languages ?? []}
                name="projectLanguages"
                placeholder="Select the project languages"
                multiple
                onLanguageClick={onChangeSelected}
            />
            <LanguageSelector
                disabled={!selectedLanguages.length}
                label="Default language"
                languages={[...selectedLanguages]}
                name="defaultLanguage"
                placeholder="Select the default language"
                onLanguageClick={onChangeDefault}
            />
        </form>
    </Dialog>
{/if}
