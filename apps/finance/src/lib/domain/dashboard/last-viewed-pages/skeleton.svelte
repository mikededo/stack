<script>
    import { ChevronRight } from 'lucide-svelte';
</script>

{#each { length: 3 } as _, i (i)}
    <div
        class="flex shrink-0 animate-pulse flex-col gap-2 rounded-md border border-surface-200 bg-white p-3"
    >
        <div class="flex items-center gap-0.5">
            <div class="h-5 w-24 rounded-md bg-surface-200"></div>
            <ChevronRight class="size-4 shrink-0 text-surface-200" strokeWidth={2.5} />
            <div class="h-5 w-16 rounded-md bg-surface-200"></div>
        </div>
        <div class="h-3 w-32 rounded-sm bg-surface-200"></div>
    </div>
{/each}
