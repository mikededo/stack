<script lang="ts">
    type Props = { chip?: boolean };
    let { chip = false }: Props = $props();
</script>

<div class="w-full animate-pulse rounded border p-3 text-left transition-all">
    {#if chip}
        <div class="flex w-full items-center justify-between gap-2">
            <div class="mb-2 h-6 w-3/5 rounded bg-surface-100"></div>
            <div class="mb-2 h-5 w-1/6 rounded-full bg-surface-100"></div>
        </div>
    {:else}
        <div class="mb-2 h-7 w-3/5 rounded bg-surface-100"></div>
        <div class="mb-1 h-3 w-full rounded bg-surface-100"></div>
        <div class="mb-2 h-3 w-1/5 rounded bg-surface-100"></div>
    {/if}
    {#each { length: 3 } as _, i (i)}
        <div class="mb-1.5 flex items-center justify-between">
            <div class="h-4 w-1/5 rounded-sm bg-surface-100"></div>
            <div class="h-2.5 w-3/5 rounded-full bg-surface-100"></div>
        </div>
    {/each}
</div>
