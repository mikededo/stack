<script lang="ts">
    import { useAnimatedPlaceholder } from './actions.svelte';
    import { getBudgetPlanContext } from './context.svelte';

    const context = getBudgetPlanContext();
</script>

<div class="flex flex-col gap-2 md:mb-2">
    <label class="text-xs font-semibold uppercase" for="plan-name">Plan name</label>
    <input
        class="w-full text-2xl font-semibold outline-hidden placeholder-shown:italic"
        bind:value={context.name}
        use:useAnimatedPlaceholder
    />
</div>
