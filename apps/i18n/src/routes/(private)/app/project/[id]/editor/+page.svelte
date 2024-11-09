<script lang="ts">
    import { IconButton, Input, TextIconButton } from '@stack/ui';

    import type { PageData } from './$types';

    import { Earth, Save, Trash } from 'lucide-svelte';

    import { page } from '$app/stores';
    import { getParamValues } from '$lib/config';
    import { EditorKeyList } from '$lib/domain/editor';
    import { useLanguages, useProject } from '$lib/hooks';

    const selectedKey = $derived(getParamValues($page.url, 'keyId'));

    type Props = { data: PageData };
    const { data }: Props = $props();
    const { id } = data;

    const query = useProject(+id);
    const languagesQuery = useLanguages();
</script>

<h1>Editor</h1>

<div class="grid grid-cols-3 w-full gap-x-8">
    <div class="col-span-2">
        <div class="flex justify-between items-center mb-4">
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

        {#if $languagesQuery.data}
            <div class="flex flex-col gap-4 w-full">
                {#each $languagesQuery.data as language}
                    <div class="flex w-full gap-2.5 flex-col">
                        <div class="flex items-center gap-1">
                            <Earth class="size-4" />
                            <p class="font-semibold">{language.name}</p>
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
    </div>
    {#if $query.data}
        <EditorKeyList project={$query.data} />
    {/if}
</div>
