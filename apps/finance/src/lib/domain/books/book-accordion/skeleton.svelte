{#each { length: 5 } as _, i (i)}
    <div
        class="flex h-10 w-full cursor-pointer items-center justify-between border-b border-primary-100 px-3 py-2 transition-colors even:bg-primary-50 last-of-type:border-0 hover:bg-primary-100/50 active:bg-primary-100"
    >
        <div class="flex w-full items-center gap-2">
            <div class="size-4 animate-pulse rounded-sm bg-primary-100"></div>
            <div class="h-4 w-1/3 animate-pulse rounded-sm bg-primary-100"></div>
        </div>
    </div>
{/each}
