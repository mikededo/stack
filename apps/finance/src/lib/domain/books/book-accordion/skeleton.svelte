{#each { length: 5 } as _, i (i)}
    <div
        class="flex h-10 w-full pointer-events-none items-center justify-between border-b px-4 py-2 first:border last:border-t-0 border-x last:border-b first:rounded-t-md overflow-hidden last:rounded-b-md"
    >
        <div class="flex w-full items-center gap-2">
            <div class="size-4 animate-pulse rounded-sm bg-surface-100"></div>
            <div class="h-4 w-1/3 animate-pulse rounded-sm bg-surface-100"></div>
        </div>
    </div>
{/each}
