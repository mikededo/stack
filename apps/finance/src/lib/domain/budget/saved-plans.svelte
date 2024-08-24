<script lang="ts">
    import type { BudgetPlan as BudgetPlanType } from '$lib/db';

    import BudgetPlan from './budget-plan.svelte';
    import { useSavedBudgetPlans } from './hooks';
    import PlanSkeleton from './plan-skeleton.svelte';

    const query = useSavedBudgetPlans();
    const xlGroups = $derived.by(() => {
        const groups: [BudgetPlanType[], BudgetPlanType[], BudgetPlanType[]] = [[], [], []];
        if (!$query.data) {
            return groups;
        }

        $query.data.forEach((plan, i) => {
            groups[i % 3].push(plan);
        });
        return groups;
    });
    const smGroups = $derived.by(() => {
        const groups: [BudgetPlanType[], BudgetPlanType[]] = [[], []];
        if (!$query.data) {
            return groups;
        }

        $query.data.forEach((plan, i) => {
            groups[i % 2].push(plan);
        });
        return groups;
    });
</script>

<div class="flex flex-col gap-1 md:mb-1">
    <h2 class="text-2xl">Your saved plans</h2>
    <p class="text-sm italic text-surface-700">
        All your saved plans are listed below. You can click on a plan to apply it.
    </p>
</div>
{#if $query.isLoading}
    <div class="hidden gap-4 xl:grid xl:grid-cols-3">
        {#each { length: 3 } as _, i (i)}
            <PlanSkeleton chip />
        {/each}
    </div>
{:else if $query.data}
    <div class="hidden gap-4 xl:grid xl:grid-cols-3">
        {#each xlGroups as group}
            <div class="flex flex-col gap-4">
                {#each group as plan (plan.id)}
                    <BudgetPlan {plan} />
                {/each}
            </div>
        {/each}
    </div>

    <div
        class="hidden grid-cols-2 gap-4 sm:grid md:hidden lg:grid lg:grid-cols-2 lg:gap-2 xl:hidden"
    >
        {#each smGroups as group}
            <div class="flex flex-col gap-4 md:gap-2">
                {#each group as plan (plan.id)}
                    <BudgetPlan {plan} />
                {/each}
            </div>
        {/each}
    </div>

    <div class="flex flex-col gap-2 sm:hidden md:flex md:gap-4 lg:hidden">
        {#each $query.data as plan (plan.id)}
            <BudgetPlan {plan} />
        {/each}
    </div>
{/if}
