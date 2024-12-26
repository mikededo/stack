<!-- Specific plan render for the saved plans -->
<script lang="ts">
    import { Chip, ContextMenu, createContextMenu, DangerDialog } from '@stack/ui';

    import type { BudgetPlan } from '$lib/db';

    import { Trash2 } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import { beforeNavigate } from '$app/navigation';

    import { getBudgetPlanContext, onToggleSavedPlan } from './context.svelte';

    type Props = { plan: BudgetPlan; onDeletePlan: (id: number) => void };
    const { onDeletePlan, plan }: Props = $props();

    const ctx = getBudgetPlanContext();
    const { allocations, name, total_income } = $derived(plan);

    let confirmDelete = $state(false);
    let duration = $state(100);
    const menu = createContextMenu();

    const getAllocationWidth = (
        percentage: null | number,
        amount: null | number,
        budget: number
    ) => {
        if (!percentage && !amount) {
            return 0;
        }

        return percentage || (amount! / budget) * 100;
    };

    const onClick = () => {
        onToggleSavedPlan(plan);
    };

    const onConfirmDelete = () => {
        confirmDelete = true;
    };

    const onCancelDelete = () => {
        confirmDelete = false;
    };

    const onInternalDeletePlan = () => {
        confirmDelete = false;
        onDeletePlan(plan.id);
    };

    beforeNavigate(() => {
        duration = 0;
    });

    const options = [{ destructive: true, Icon: Trash2, onClick: onConfirmDelete, text: 'Delete' }];
</script>

<button
    class="group group w-full rounded border border-surface-200 p-3 text-left transition-all aria-checked:border-solid aria-checked:border-primary aria-checked:bg-primary-50 hover:border-solid hover:border-primary"
    use:menu.trigger
    aria-checked={ctx.id === plan.id}
    role="checkbox"
    transition:fade|global={{ duration }}
    onclick={onClick}
>
    <div class="w-ful mb-1 flex items-center justify-between gap-2">
        <p class="w-ful truncate text-lg font-semibold">{name}</p>
        <Chip class="shrink-0" variant="primary">€ {total_income}</Chip>
    </div>
    {#each allocations as { amount, name, percentage } (name)}
        <div class="flex items-center justify-between text-sm">
            <p class="w-full truncate italic text-surface-700">
                {percentage ? `${percentage}%` : `€ ${amount}`} - {name}
            </p>
            <div
                class="h-2.5 w-[128px] shrink-0 overflow-hidden rounded-full bg-surface-100 transition-colors group-aria-checked:bg-surface-200"
            >
                <div
                    class="ml-auto h-full rounded-full bg-secondary-500 transition-all"
                    style="width: {getAllocationWidth(percentage, amount, total_income)}%"
                ></div>
            </div>
        </div>
    {/each}
</button>

<ContextMenu menu={menu.menu} {options} />

{#if confirmDelete}
    <DangerDialog onCancel={onCancelDelete} onConfirm={onInternalDeletePlan}>
        <p>Do you really want to delete the <strong>{name}</strong> plan and it's allocations?</p>
    </DangerDialog>
{/if}
