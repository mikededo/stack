<div class="w-full animate-pulse rounded border p-3 text-left transition-all">
    <div class="mb-2 h-7 w-3/5 rounded bg-surface-100"></div>
    <div class="mb-1 h-3 w-full rounded bg-surface-100"></div>
    <div class="mb-2 h-3 w-1/5 rounded bg-surface-100"></div>
    {#each { length: 3 } as _, i (i)}
        <div class="mb-1.5 flex items-center justify-between">
            <div class="h-4 w-1/5 rounded bg-surface-100"></div>
            <div class="h-2.5 w-3/5 rounded bg-surface-100"></div>
        </div>
    {/each}
</div>
