<script lang="ts">
    import { getSupabaseClient, getUserDataContext } from '@mstack/svelte-supabase';

    import { useQueryClient } from '@tanstack/svelte-query';
    import { goto } from '$app/navigation';
    import { Pin } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import type { PinnedPage } from '$lib/db';

    import { useClickPinnedPage, usePinnedPages } from '$lib/hooks';

    import PinPlaceholder from './pin-placeholder.svelte';
    import PinSkeleton from './pin-skeleton.svelte';

    const supabase = getSupabaseClient();
    const queryClient = useQueryClient();
    const user = getUserDataContext();
    const pinnedPagesQuery = usePinnedPages(supabase);
    const pinnedPageClickMutation = useClickPinnedPage(supabase, queryClient);

    const handleOnClick = (page: NonNullable<PinnedPage>) => () => {
        $pinnedPageClickMutation.mutate({ page: page.id, userId: user.id });
        goto(`/app/${page.book_id}/${page.id}`);
    };
</script>

<section class="flex flex-col gap-3 md:mb-4">
    <p class="text-sm">Pinned pages</p>
    <div
        class="flex h-20 items-start gap-2 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface-200 hover:scrollbar-thumb-surface-400"
    >
        {#if $pinnedPagesQuery.isLoading}
            <PinSkeleton />
        {:else if $pinnedPagesQuery.data}
            {#each $pinnedPagesQuery.data as { page } (page?.id)}
                {#if page}
                    <button
                        class="flex w-60 shrink-0 flex-col items-start gap-1 overflow-x-hidden rounded-lg border border-surface-200 bg-white p-3 transition-colors duration-100 hover:border-primary-300"
                        transition:fade|global={{ duration: 200 }}
                        onclick={handleOnClick(page)}
                    >
                        <div class="flex w-full items-center justify-between">
                            <p class="text-sm font-semibold">{page.name}</p>
                            <Pin class="size-4 rotate-45  stroke-primary" strokeWidth={2} />
                        </div>
                        <span class="text-xs italic text-surface-700"> Last updated tomorrow </span>
                    </button>
                {/if}
            {/each}

            {#if $pinnedPagesQuery.data.length < 5}
                <PinPlaceholder />
            {/if}
        {/if}
    </div>
</section>
