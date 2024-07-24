<script lang="ts">
    import { File, Link2 } from 'lucide-svelte';
    import type { Snippet } from 'svelte';

    type Props = {
        name: Snippet;
        owner: string;
        createdAt: Date;
        isShared?: boolean;
    };
    let { name, owner, createdAt, isShared }: Props = $props();
</script>

<li
    class="flex w-full cursor-pointer items-center justify-between gap-2 border-b border-secondary-100 px-3 py-2 transition-colors odd:bg-secondary-50 last-of-type:border-0 hover:bg-secondary-100/50 active:bg-secondary-100"
>
    <div class="flex w-full items-center gap-2">
        <File class="size-4" strokeWidth={2.5} />
        {@render name()}
    </div>
    <div class="flex items-center gap-4">
        <div class="w-11">
            <span
                class="mx-auto flex size-6 items-center justify-center rounded-full bg-primary text-sm font-semibold uppercase text-white"
            >
                {owner}
            </span>
        </div>
        <span class="hidden w-20 text-center text-xs md:block">
            {createdAt.toLocaleDateString()}
        </span>
        <Link2
            class={`size-4 rotate-45 ${!isShared ? 'text-secondary-200' : ''}`}
            strokeWidth={2.5}
        />
    </div>
</li>
