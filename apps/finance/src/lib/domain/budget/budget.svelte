<script lang="ts">
    import { useMoneyMask } from '@stack/actions';
    import { Input } from '@stack/ui';

    import { getBudgetPlanContext } from './context.svelte';

    const context = getBudgetPlanContext();
</script>

<Input
    class="w-full"
    bind:value={context.budget}
    label="Total income"
    placeholder="€ 1000"
    use={[useMoneyMask]}
/>
