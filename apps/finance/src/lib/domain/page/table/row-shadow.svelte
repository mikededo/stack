<script lang="ts">
    import { GripVertical } from 'lucide-svelte';

    import { getDragContext } from './drag-context.svelte';
    import EntryContent from './entry-content.svelte';
    import { parseDate } from './helpers';

    const ctx = getDragContext();
</script>

{#if ctx.activeRow}
    <div
        class="fixed z-[100] rounded-sm shadow-md bg-white gap-2 p-2 opacity-95 flex pointer-events-none text-sm"
        aria-rowindex={0}
        role="row"
        style="top: {ctx.shadowPosition.y}px; width: {ctx.shadowPosition.width}px"
        style:left="{ctx.shadowPosition.x}px"
    >
        <div class="w-8 flex pt-3.5 justify-center shrink-0">
            <GripVertical class="fill-surface-500" size={16} />
        </div>
        <EntryContent>
            {#snippet dateContent()}{parseDate(ctx.activeRow?.date)}{/snippet}
            {#snippet amountContent()}
                {ctx.activeRow?.amount ? `€ ${ctx.activeRow.amount.toFixed(2)}` : undefined}
            {/snippet}
            {#snippet commentContent()}{ctx.activeRow?.comment}{/snippet}
            {#snippet tagsContent()}<div></div>{/snippet}
        </EntryContent>
    </div>
{/if}
