<script>
    import { Input } from '@stack/ui';

    import { Allocations, PlanName } from '$lib/domain/budget';
</script>

<div class="md:mb-4">
    <h1 class="mb-2">Budget planner</h1>
    <p class="text-sm italic text-surface-700">
        Still don't know how to manage your income? Let's help you plan your budget with a template
        plan or your custom plan!
    </p>
</div>

<PlanName />
<Input class="w-full" label="Total income" placeholder="€ 1000" />
<div class="flex flex-col gap-4 rounded-lg border border-surface-200 p-6 pt-4">
    <div>
        <h2 class="text-xl font-semibold">Budget allocations</h2>
        <p class="text-sm italic text-surface-700">
            Here you can see the allocations of your budget. You can add new allocations or edit the
            ones that you already have.
        </p>
    </div>

    <Allocations />
</div>
