<script context="module" lang="ts">
</script>

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
        getAmountPlaceholder,
        getBudgetPlanContext,
        getPercentagePlaceholder,
        onChangeAllocationProperty,
        onDeleteAllocation,
        onNewAllocation,
        totalSalaryAllocated
    } from './context.svelte';

    let ctx = getBudgetPlanContext();
    let duration = $state(100);
    const allocatedAmount = $derived(totalSalaryAllocated());
    const canPlanBeSaved = $derived(
        areAllocationNamesValid() && allocatedAmount === '100' && ctx.name && ctx.budget
    );

    beforeNavigate(() => {
        duration = 0;
    });
</script>

<div class="flex flex-col gap-4 rounded-lg border border-surface-200 p-6 pt-4">
    <div>
        <h2 class="text-xl font-semibold">Budget allocations</h2>
        <p class="text-sm italic text-surface-700">
            Here you can see the allocations of your budget. You can add new allocations or edit the
            ones that you already have.
        </p>
    </div>

    <div class="flex flex-col gap-3">
        {#each ctx.allocations as { amount, id, name, percentage }, i (id)}
            <div class="flex gap-16" transition:fade|global={{ duration }}>
                <div class="flex w-full flex-col justify-between">
                    <input
                        class="text-sm font-semibold outline-none"
                        placeholder="Allocation name"
                        value={name}
                        oninput={onChangeAllocationProperty(i, 'name')}
                    />
                    <div class="h-2.5 w-full overflow-hidden rounded-full bg-surface-100">
                        <div
                            class="h-full w-0 rounded-full bg-secondary-500 transition-all"
                            style="width: {getAllocationPercentage(percentage, amount)}%"
                        ></div>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <div class="flex">
                        <Input
                            class="w-20 rounded-r-none border-r border-r-surface-200"
                            color="surface"
                            disabled={Number(percentage) !== 0}
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

        <p class="color-surface-600 ml-auto text-sm italic">
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
    label="Save plan"
    onclick={console.log}
/>
