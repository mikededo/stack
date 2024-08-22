<script>
    import { portal } from '@stack/actions';
    import { getSupabaseClient } from '@stack/svelte-supabase';
    import { Button, IconButton } from '@stack/ui';

    import { createQuery } from '@tanstack/svelte-query';
    import { LayoutTemplate, X } from 'lucide-svelte';
    import { spring } from 'svelte/motion';

    import { Keys } from '$lib/config';
    import { getBudgetPresets } from '$lib/db/queries/budget';
    import {
        initBudgetPlanContext,
        PlanAllocations,
        PlanBudget,
        PlanName
    } from '$lib/domain/budget';

    initBudgetPlanContext();

    const supabase = getSupabaseClient();
    const plansQuery = createQuery({
        queryFn: () => getBudgetPresets(supabase),
        queryKey: Keys.BUDGET_PRESETS
    });
    const position = spring(0, { damping: 1, stiffness: 0.25 });
    let show = $state(false);

    const onOpenPresets = () => {
        show = true;
        position.set(480);

        if (document) {
            document.getElementById('content')?.classList.add('scale-[0.98]');
        }
    };

    const onHidePresets = () => {
        setTimeout(() => {
            show = false;
        }, 250);
        position.set(0);

        if (document) {
            document.getElementById('content')?.classList.remove('scale-[0.98]');
        }
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

{#if show}
    <div
        class="ui-fixed ui-inset-0 bg-black/30"
        use:portal={''}
        style="opacity: {$position / 480}"
    ></div>
{/if}
<div
    class="fixed bottom-0 right-0 top-0 z-10 flex h-full overflow-x-hidden"
    use:portal={''}
    role="dialog"
    style="right: {-480 + $position}px"
>
    <div class="flex h-full w-[480px] flex-col items-center gap-8 rounded-l-lg bg-white px-5 py-4">
        <div class="flex flex-col gap-4">
            <div class="flex w-full items-center justify-between">
                <div class="flex items-center gap-2">
                    <LayoutTemplate class="size-5" strokeWidth={2.5} />
                    <h2 class="text-2xl">Premade plans</h2>
                </div>
                <IconButton color="muted" Icon={X} onclick={onHidePresets} />
            </div>
            <p class="text-sm text-surface-700">
                Here are some preset budget plans that you can use as a starting point.
            </p>
        </div>
        {#if $plansQuery.isLoading}
            <div>Loading</div>
        {:else if $plansQuery.data}
            <div class="flex h-full w-full flex-col gap-2">
                {#each $plansQuery.data as { allocations, id, name } (id)}
                    <button
                        class="w-full rounded border border-dashed border-surface-200 p-3 text-left transition-all hover:border-solid hover:border-primary-300"
                    >
                        <div class="mb-1 text-lg font-semibold">{name}</div>
                        {#each allocations as { name, percentage } (name)}
                            <div class="flex items-center justify-between text-sm">
                                <p>{name} ({percentage}%)</p>
                                <div
                                    class="h-2.5 w-[128px] overflow-hidden rounded-full bg-surface-100"
                                >
                                    <div
                                        class="ml-auto h-full w-0 rounded-full bg-secondary-500 transition-all"
                                        style="width: {percentage}%"
                                    ></div>
                                </div>
                            </div>
                        {/each}
                    </button>
                {/each}
                <Button class="ml-auto mt-auto self-end" color="primary">Use selected</Button>
            </div>
        {/if}
    </div>
</div>
