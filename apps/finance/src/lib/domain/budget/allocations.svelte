<script lang="ts">
    import { useMoneyMask, usePercentageMask } from '@stack/actions';
    import { IconButton, Input, TextIconButton } from '@stack/ui';

    import { Plus, Save, Trash2 } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import { beforeNavigate } from '$app/navigation';

    import { useUpDownArrows } from './actions.svelte';
    import {
        areAllocationNamesValid,
        getAllocationPercentage,
        getAllocations,
        getAmountPlaceholder,
        getBudgetPlanContext,
        getPercentagePlaceholder,
        isAmountOverBudget,
        onChangeAllocationProperty,
        onDeleteAllocation,
        onNewAllocation,
        totalSalaryAllocated
    } from './context.svelte';
    import { useUpsertPlan } from './hooks';

    const ctx = getBudgetPlanContext();
    const createPlan = useUpsertPlan();
    const allocatedAmount = $derived(totalSalaryAllocated());
    const canPlanBeSaved = $derived(
        areAllocationNamesValid() && allocatedAmount === '100' && ctx.name && ctx.budget
    );
    let duration = $state(100);

    const onSavePlan = () => {
        $createPlan.mutate();
    };

    beforeNavigate(() => {
        duration = 0;
    });

</script>

<div class="flex flex-col gap-4 rounded-md border border-surface-200 p-6 pt-4">
    <div>
        <h2 class="text-xl font-semibold">Budget allocations</h2>
        <p class="text-sm italic text-surface-700">
            Here you can see the allocations of your budget. You can add new allocations or edit the
            ones that you already have.
        </p>
    </div>

    <div class="flex flex-col gap-3">
        {#each getAllocations() as { amount, id, name, percentage }, i (id)}
            <div
                class="flex flex-col gap-4 sm:flex-row sm:gap-8 md:flex-col md:gap-2 lg:flex-row lg:gap-16"
                transition:fade|global={{ duration }}
            >
                <div
                    class="flex w-full flex-col justify-between gap-2 md:flex-row md:items-center lg:flex-col lg:items-start"
                >
                    <input
                        class="shrink-0 text-sm font-semibold outline-none md:w-60 lg:w-auto"
                        placeholder="Allocation name"
                        value={name}
                        oninput={onChangeAllocationProperty(i, 'name')}
                    />
                    <div class="h-2.5 w-full overflow-hidden rounded-full bg-surface-100 lg:block">
                        <div
                            class="h-full w-0 rounded-full bg-secondary-500 transition-all"
                            style="width: {getAllocationPercentage(percentage, amount)}%"
                        ></div>
                    </div>
                </div>
                <div class="flex items-center justify-between gap-4 lg:flex-row">
                    <div class="flex">
                        <Input
                            class="w-40 rounded-r-none border-r border-r-surface-200 aria-invalid:border-r-destructive-500"
                            color={isAmountOverBudget(amount) ? 'destructive' : 'surface'}
                            disabled={Number(percentage) !== 0}
                            invalid={isAmountOverBudget(amount)}
                            name="amount"
                            placeholder={getAmountPlaceholder(percentage)}
                            use={[[useUpDownArrows, '€ '], useMoneyMask]}
                            value={amount}
                            oninput={onChangeAllocationProperty(i, 'amount')}
                        />
                        <Input
                            class="w-[4.5rem] rounded-l-none border-l-0 hover:border-l-0"
                            color="surface"
                            disabled={Number(amount) !== 0 || !ctx.budget}
                            name="percentage"
                            placeholder={getPercentagePlaceholder(amount)}
                            use={[[useUpDownArrows, '% '], usePercentageMask]}
                            value={percentage}
                            oninput={onChangeAllocationProperty(i, 'percentage')}
                        />
                    </div>
                    <IconButton
                        color="destructive"
                        Icon={Trash2}
                        iconClasses="shrink-0"
                        onclick={onDeleteAllocation(i)}
                    />
                </div>
            </div>
        {/each}

        <p
            class="color-surface-600 ml-auto text-sm italic"
            class:text-destructive-500={Number(allocatedAmount) > Number('100')}
            class:text-secondary-500={Number(allocatedAmount) < Number('100')}
        >
            Total income allocated: {allocatedAmount}%
        </p>
        <TextIconButton
            class="ml-auto"
            color="surface"
            disabled={allocatedAmount === '100'}
            Icon={Plus}
            label="New allocation"
            onclick={onNewAllocation}
        />
    </div>
</div>

<TextIconButton
    class="ml-auto"
    color="primary"
    disabled={!canPlanBeSaved}
    Icon={Save}
    label={ctx.id ? 'Update plan' : 'Create plan'}
    onclick={onSavePlan}
/>
