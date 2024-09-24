<script lang="ts">
    import { Chip } from '@stack/ui';

    import { slide } from 'svelte/transition';

    import { getDragContext } from './drag-context.svelte';
    import EntryContent from './entry-content.svelte';
    import { parseDate } from './helpers';

    type Props = { position: number };
    const { position }: Props = $props();

    const ctx = getDragContext();
</script>

<div
    class="group flex w-full items-stretch bg-surface-50 !text-sufrace-300 relative border-b border-primary-100 origin-top transition-all !italic"
    aria-rowindex={position + 1}
    role="row"
    transition:slide={{ axis: 'y' }}
>
    <div class="w-8 flex pt-3.5 justify-center shrink-0 cursor-grab" role="gridcell">
    </div>
    <EntryContent>
        {#snippet dateContent()}{parseDate(ctx.activeRow?.date)}{/snippet}
        {#snippet amountContent()}
            {ctx.activeRow?.amount ? `€ ${ctx.activeRow.amount.toFixed(2)}` : undefined}
        {/snippet}
        {#snippet commentContent()}{ctx.activeRow?.comment}{/snippet}
        {#snippet tagsContent()}
            <div class="flex flex-wrap items-center gap-1">
                {#each (ctx.activeRow?.tags ?? []) as tag (tag.id)}
                    <Chip color={tag.color}>{tag.name}</Chip>
                {/each}
            </div>
        {/snippet}
    </EntryContent>
</div>
