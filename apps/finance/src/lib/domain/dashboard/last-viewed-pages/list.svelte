<script lang="ts">
    import { useLastViewedPages } from '$lib/hooks';

    import LastViewedItem from './item.svelte';
    import LastViewedSkeleton from './skeleton.svelte';

    const lastViewedPages = useLastViewedPages();

    $effect(() => {
        if ($lastViewedPages.isLoading || !$lastViewedPages.data) {
            return;
        }
    });
</script>

<section class="flex flex-col gap-3 md:mb-4">
    <p class="text-sm font-semibold">Recently viewed pages</p>
    <div class="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-5">
        {#if $lastViewedPages.isLoading}
            <LastViewedSkeleton />
        {:else if $lastViewedPages.data}
            {#each $lastViewedPages.data as entry (entry.page?.id)}
                {#if entry}
                    <LastViewedItem {entry} />
                {/if}
            {/each}
        {/if}
    </div>
</section>
