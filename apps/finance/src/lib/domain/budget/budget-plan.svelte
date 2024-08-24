<!-- Specific plan render for the saved plans -->
<script lang="ts">
    import { Chip } from '@stack/ui';

    import { fade } from 'svelte/transition';

    import type { BudgetPlan } from '$lib/db';

    import { beforeNavigate } from '$app/navigation';

    import { getBudgetPlanContext, onToggleSavedPlan } from './context.svelte';

    type Props = { plan: BudgetPlan };
    let { plan }: Props = $props();

    const ctx = getBudgetPlanContext();
    let { allocations, name, total_income } = plan;
    let duration = $state(100);

    const getAllocationWidth = (
        percentage: null | number,
        amount: null | number,
        budget: number
    ) => {
        if (!percentage && !amount) {
            return 0;
        }

        return percentage ? percentage : (amount! / budget) * 100;
    };

    const onClick = () => {
        onToggleSavedPlan(plan);
    };

    beforeNavigate(() => {
        duration = 0;
    });
</script>

<button
    class="group group w-full rounded border border-surface-200 p-3 text-left transition-all aria-checked:border-solid aria-checked:border-primary aria-checked:bg-primary-50 hover:border-solid hover:border-primary"
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
