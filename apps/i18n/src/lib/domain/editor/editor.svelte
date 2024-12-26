<script lang="ts">
    import { Chip, IconButton, Input, TextIconButton } from '@stack/ui';

    import type { ProjectKeys } from '$lib/db';

    import { Earth, Save, Trash } from 'lucide-svelte';

    import { page } from '$app/stores';
    import { getParamValues } from '$lib/config';
    import { useProject } from '$lib/hooks';

    type Props = { project: number };
    const { project }: Props = $props();

    const projectQuery = useProject(project);

    const selectedKey = $derived(getParamValues($page.url, 'keyId'));

    const orderProjectLanguages = (languages: ProjectKeys['languages']) =>
        languages.sort((a, b) => Number(b.is_default) - Number(a.is_default));
</script>

<div class="flex justify-between items-center mb-6">
    <p
        class="text-lg"
        class:italic={!selectedKey}
        class:text-surface-600={!selectedKey}
    >
        {selectedKey ?? 'No key selected'}
    </p>

    <div class="flex items-center gap-1">
        <TextIconButton color="primary"
            Icon={Save}
            label="Save"
        />
        <IconButton
            color="destructive"
            Icon={Trash}
            wrapperClasses="size-10"
        />
    </div>
</div>

{#if $projectQuery.data}
    <div class="flex flex-col gap-6 w-full">
        {#each orderProjectLanguages($projectQuery.data.languages) as language}
            <div class="flex w-full gap-2.5 flex-col">
                <div class="flex items-center gap-1">
                    <Earth class="size-4" />
                    <p class="font-semibold">{language.name}</p>
                    {#if language.is_default}
                        <Chip class="ml-auto" variant="primary">Default</Chip>
                    {/if}
                </div>
                <Input
                    class="w-full min-h-32 border border-surface-100 rounded-lg resize-none"
                    disabled={!selectedKey}
                    multiline
                />
            </div>
        {/each}
    </div>
{/if}
