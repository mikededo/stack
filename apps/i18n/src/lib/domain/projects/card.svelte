<script lang="ts">
    import type { Project } from '$lib/db/queries';

    import { ExternalLink } from 'lucide-svelte';

    import { pathTo } from '$lib/config';
    import { LanguageContainer, LanguageItem } from '$lib/domain/language';

    type Props = { project: Project };
    const { project }: Props = $props();

    const { id, languages, last_updated, name, website_url: website } = project;
</script>

<div class="border-border flex h-40 w-full gap-6 rounded border p-4">
    <div class="h-24 w-24 shrink-0 rounded bg-surface-50"></div>
    <div class="flex w-full flex-col justify-between">
        <div class="flex items-center gap-1 self-end">
            <a class="text-lg font-bold hover:underline" href={pathTo('project', { project: `${id}` })}>
                {name}
            </a>
            {#if website}
                <a
                    class="cursor-pointer rounded-sm p-1 transition-colors hover:bg-surface-50"
                    href={website}
                    rel="noreferrer"
                    target="_blank"
                >
                    <ExternalLink class="h-4 w-4" />
                </a>
            {/if}
        </div>
        <div class="flex w-full flex-col gap-2 text-xs">
            {#if languages.length > 0}
                <LanguageContainer class="self-end">
                    {#each languages as { code, id } (id)}
                        <LanguageItem isDefault={false} {code} />
                    {/each}
                </LanguageContainer>
            {/if}
            <div class="flex flex-col items-end">
                <p>90% translated</p>
                {#if last_updated}
                    <p>Last updated: {new Date(last_updated).toLocaleDateString()}</p>
                {/if}
            </div>
        </div>
    </div>
</div>
