<script>
    import {
        initBudgetPlanContext,
        PlanAllocations,
        PlanBudget,
        PlanName
    } from '$lib/domain/budget';

    initBudgetPlanContext();
</script>

<div class="md:mb-4">
    <h1 class="mb-2">Budget planner</h1>
    <p class="text-sm italic text-surface-700">
        Still don't know how to manage your income? Let's help you plan your budget with a template
        plan or your custom plan!
    </p>
</div>

<PlanName />
<PlanBudget />
<PlanAllocations />
