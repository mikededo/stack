<script lang="ts">
    import type { BudgetPresets } from '$lib/db';

    import { getBudgetPlanContext, toggleActivePreset } from './context.svelte';

    type Props = { plan: BudgetPresets[number] };
    let { plan }: Props = $props();
    let { allocations, description, name } = plan;

    const ctx = getBudgetPlanContext();

    const onClick = () => {
        toggleActivePreset(plan);
    };
</script>

<button
    class="group w-full rounded border border-dashed border-surface-200 p-3 text-left transition-all aria-checked:border-solid aria-checked:border-primary aria-checked:bg-primary-50 hover:border-solid hover:border-primary"
    aria-checked={ctx.activePreset?.id === plan.id}
    role="checkbox"
    onclick={onClick}
>
    <p class="mb-1 text-lg font-semibold">{name}</p>
    <p class="mb-2 text-sm">{description}</p>
    {#each allocations as { name, percentage } (name)}
        <div class="flex items-center justify-between text-sm">
            <p class="w-full truncate italic text-surface-700">
                {percentage}% - {name}
            </p>
            <div
                class="h-2.5 w-[128px] shrink-0 overflow-hidden rounded-full bg-surface-100 transition-colors group-aria-checked:bg-surface-200"
            >
                <div
                    class="ml-auto h-full w-0 rounded-full bg-secondary-500 transition-all"
                    style="width: {percentage}%"
                ></div>
            </div>
        </div>
    {/each}
</button>
