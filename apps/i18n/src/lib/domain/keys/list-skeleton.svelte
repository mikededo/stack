<script lang="ts">
    import { Chip } from '@stack/ui';
</script>

<div class="border rounded overflow-x-auto border-surface-100 text-sm" role="table">
    <div class="px-4 py-3 flex items-center border-b border-surface-100 bg-surface-50 w-full min-w-full" role="row">
        <div class="w-48 md:w-64 shrink-0 font-semibold" role="cell">Key identifier</div>
        <div class="w-48 shrink-0" role="cell">
            <Chip variant="primary">Status</Chip>
        </div>
        {#each Array.from({ length: 3 }) as _}
            <div class="w-48 shrink-0" role="cell">
                <div class="h-5 w-24 animate-pulse rounded-lg bg-surface-200"></div>
            </div>
        {/each}
    </div>
    <div role="rowgroup">
        {#each Array.from({ length: 5 }) as _}
            <div class="flex items-center px-4 py-3 border-b border-surface-100 last:border-none min-w-full w-fit" role="row">
                <div class="flex flex-col gap-1 w-48 md:w-64 shrink-0" role="cell">
                    <div class="h-4 w-24 animate-pulse rounded bg-surface-100"></div>
                    <div class="h-3 w-36 animate-pulse rounded bg-surface-100"></div>
                </div>
                {#each Array.from({ length: 4 }) as _}
                    <div class="w-48 shrink-0" role="cell">
                        <div class="h-4 w-24 animate-pulse rounded bg-surface-100"></div>
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</div>
