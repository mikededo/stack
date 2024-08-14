{#each { length: 3 } as _, i (i)}
    <div
        class="flex w-60 shrink-0 animate-pulse flex-col gap-2 rounded-lg border border-surface-200 bg-white p-3"
    >
        <div class="flex items-center justify-between">
            <div class="h-5 w-24 rounded-md bg-surface-200"></div>
            <div class="size-5 rounded-md bg-surface-200"></div>
        </div>
        <div class="h-3 w-32 rounded-sm bg-surface-200"></div>
    </div>
{/each}
