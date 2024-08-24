<!-- Specific plan render for the saved plans -->
<script lang="ts">
    import type { BudgetPlan } from '$lib/db';

    type Props = { plan: BudgetPlan };
    let { plan }: Props = $props();
    let { allocations, name, total_income } = plan;

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
</script>

<button
    class="group w-full rounded border border-surface-200 p-3 text-left transition-all hover:border-solid hover:border-primary"
>
    <p class="truncate text-lg font-semibold">{name}</p>
    <p class="mb-0.5">€ {total_income}</p>
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
