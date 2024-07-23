<script lang="ts">
    import { File, Link2 } from 'lucide-svelte';

    import type { BookWithPages } from '$lib/db';

    type Props = { book: BookWithPages };
    let { book }: Props = $props();
</script>

<li
    class="bg-secondary-50 flex items-center justify-between py-1.5 pl-4 pr-3 text-xs font-semibold uppercase"
>
    <p>Page name</p>
    <div class="flex items-center gap-4">
        <span>Owner</span>
        <span class="w-20 text-center">Created at</span>
        <div class="size-4"></div>
    </div>
</li>
{#each book.page as page (page.id)}
    <li
        class="border-secondary-100 odd:bg-secondary-50 hover:bg-secondary-100/50 active:bg-secondary-100 flex w-full cursor-pointer items-center justify-between gap-2 border-b px-3 py-2 transition-colors last-of-type:border-0"
    >
        <div class="flex items-center gap-2">
            <File class="size-4" strokeWidth={2.5} />
            <span>{page.name}</span>
        </div>
        <div class="flex items-center gap-4">
            <div class="w-11">
                <span
                    class="bg-primary mx-auto flex size-6 items-center justify-center rounded-full text-sm font-semibold uppercase text-white"
                    aria-describedby={`${page.id}-creator`}
                >
                    <!-- {page.created_by.slice(0, 1)} -->
                    M
                </span>
            </div>
            <span class="w-20 text-center text-xs">
                {new Date(page.created_at).toLocaleDateString()}
            </span>
            {#if page.id % 2 === 1}
                <Link2 class="size-4 rotate-45" strokeWidth={2.5} />
            {:else}
                <div class="size-4"></div>
            {/if}
        </div>
    </li>
{/each}
