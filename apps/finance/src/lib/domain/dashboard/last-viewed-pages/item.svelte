<script lang="ts">
    import { getRelativeTimeText, isMoreThanAMinuteAgo, isMoreThanAnHourAgo } from '@stack/utils';

    import { ChevronRight } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import type { LastViewedPage } from '$lib/db';

    import { beforeNavigate } from '$app/navigation';
    import { pathTo } from '$lib/config';

    type Props = { entry: LastViewedPage[number] };
    let { entry }: Props = $props();
    let { last_accessed, page } = entry;

    let duration = $state(200);
    let relativeTime = $state(
        getRelativeTimeText(last_accessed ? new Date(last_accessed) : new Date())
    );
    let href = $derived(
        page ? pathTo('page', { book: `${page.book_id}`, page: `${page.id}` }) : undefined
    );

    const getNextTimeout = () => {
        if (!last_accessed) {
            return;
        }

        if (isMoreThanAnHourAgo(new Date(), new Date(last_accessed))) {
            return;
        }

        return isMoreThanAMinuteAgo(new Date(), new Date(last_accessed)) ? 5000 : 1000 * 60;
    };

    const recalculateRelativeTime = (): any => {
        if (!last_accessed) {
            return;
        }

        relativeTime = getRelativeTimeText(new Date(last_accessed));
        const next = getNextTimeout();
        if (next) {
            return setTimeout(recalculateRelativeTime, next);
        }
    };

    $effect(() => {
        const timeout = recalculateRelativeTime();
        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    });

    beforeNavigate(() => {
        duration = 0;
    });
</script>

<a
    class="flex shrink-0 flex-col items-start gap-1 overflow-x-hidden rounded-lg border border-surface-200 bg-white p-3 transition-all duration-100 hover:border-primary-300 active:scale-[0.98]"
    {href}
    transition:fade|global={{ delay: 100, duration }}
>
    <div class="flex w-full items-center justify-between">
        <p class="flex items-center gap-0.5 truncate text-sm font-semibold">
            <span class="truncate">{page?.name}</span>
            {#if page?.book?.name}
                <ChevronRight class="size-4 shrink-0 text-surface-800" strokeWidth={2.5} />
                <span class="shrink-0 text-surface-800">{page.book.name}</span>
            {/if}
        </p>
    </div>
    <span class="text-xs italic text-surface-700">
        Viewed {relativeTime}
    </span>
</a>
