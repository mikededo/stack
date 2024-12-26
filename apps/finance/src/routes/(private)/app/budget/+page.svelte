<script lang="ts">
    import { getSupabaseClient } from '@stack/supabase';
    import { Button, Drawer, IconButton } from '@stack/ui';

    import { createQuery } from '@tanstack/svelte-query';
    import { LayoutTemplate } from 'lucide-svelte';

    import { Keys } from '$lib/config';
    import { getBudgetPresets } from '$lib/db/queries';
    import {
        applyActivePreset,
        initBudgetPlanContext,
        PlanAllocations,
        PlanBudget,
        PlanName,
        PresetPlan,
        SavedBudgetPlans
    } from '$lib/domain/budget';

    const ctx = initBudgetPlanContext();

    const supabase = getSupabaseClient();
    const plansQuery = createQuery({
        queryFn: () => getBudgetPresets(supabase),
        queryKey: Keys.BUDGET_PRESETS
    });
    let show = $state(false);

    const onOpenPresets = () => {
        show = true;
    };

    const onHidePresets = () => {
        show = false;
    };

    const onApplyPreset = () => {
        applyActivePreset();
        onHidePresets();
    };
</script>

<div class="md:mb-4">
    <div class="mb-2 flex items-center justify-between">
        <h1>Budget planner</h1>
        <IconButton
            color="muted"
            disabled={$plansQuery.isLoading}
            Icon={LayoutTemplate}
            size="large"
            onclick={onOpenPresets}
        />
    </div>
    <p class="text-sm italic text-surface-700">
        Still don't know how to manage your income? Let's help you plan your budget with a template
        plan or your custom plan!
    </p>
</div>

<PlanName />
<PlanBudget />
<PlanAllocations />
<SavedBudgetPlans />

<Drawer header="Premade plans"
    Icon={LayoutTemplate}
    {show}
    onClose={onHidePresets}
>
    {#snippet subtitle()}
        Here are some preset budget plans that you can use as a starting point.
    {/snippet}

    {#if $plansQuery.isLoading}
        <div>Loading</div>
    {:else if $plansQuery.data}
        <div class="flex h-full w-full flex-col gap-2">
            {#each $plansQuery.data as plan (plan.id)}
                <PresetPlan {plan} />
            {/each}
            <div class="ml-auto mt-auto flex items-center gap-2">
                <Button color="muted" onclick={onHidePresets}>Cancel</Button>
                <Button color="primary" disabled={!ctx.activePreset} onclick={onApplyPreset}>
                    Apply selected
                </Button>
            </div>
        </div>
    {/if}
</Drawer>
