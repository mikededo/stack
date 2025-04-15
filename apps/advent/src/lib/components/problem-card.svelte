<script lang="ts">
    import type { SolvedVisualization } from '$lib/utils';

    type Props = {
        problem: SolvedVisualization;
    };
    const { problem }: Props = $props();
    const { description, href, tags, title } = problem;
</script>

<a
    class="flex flex-col gap-1 border px-3 py-2 bg-background transition-all rounded-lg duration-200 hover:shadow-md hover:shadow-surface-100 hover:border-primary-300 hover:-translate-y-1 md:px-3"
    {href}
>
    <p class="font-semibold">{title}</p>
    <div class="text-sm">
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html description}
    </div>
    <div class="flex flex-wrap items-center gap-1 my-1">
        {#each tags as tag}
            <div class="flex items-center justify-center rounded-full border border-purple-100 bg-purple-100 px-2 py-1 font-medium text-purple-500">
                <div class="text-xs font-normal leading-none">{tag}</div>
            </div>
        {/each}
    </div>
</a>
