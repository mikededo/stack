<script context="module" lang="ts">
    type Allocation = {
        amount: string;
        name: string;
        percentage: string;
    };
</script>

<script lang="ts">
    import { IconButton, Input, TextIconButton } from '@stack/ui';

    import { Plus, Trash2, X } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import { beforeNavigate } from '$app/navigation';

    let allocations = $state<Allocation[]>([{ amount: '', name: '', percentage: '' }]);
    let duration = $state(100);

    const onChangeProperty = (i: number, property: keyof Allocation) => (event: Event) => {
        const target = event.target as HTMLInputElement;
        const updated = [...allocations];
        updated[i][property] = target.value;
        allocations = updated;
    };

    const onNewAllocation = () => {
        allocations = [...allocations, { amount: '', name: '', percentage: '' }];
    };

    const onDeleteAllocation = (i: number) => () => {
        const updated = [...allocations];
        updated.splice(i, 1);
        allocations = updated;
    };

    beforeNavigate(() => {
        duration = 0;
    });
</script>

<div class="flex flex-col gap-3">
    {#each allocations as { amount, name, percentage }, i (i)}
        <div class="flex gap-16" transition:fade|global={{ duration }}>
            <div class="flex w-full flex-col justify-between">
                <input
                    class="text-sm font-semibold outline-none"
                    placeholder="Allocation name"
                    value={name}
                    onchange={onChangeProperty(i, 'name')}
                />
                <div class="h-2.5 w-full overflow-hidden rounded-full bg-surface-100">
                    <div class="h-full w-1/3 rounded-full bg-secondary-500"></div>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <div class="flex">
                    <Input
                        class="w-20 rounded-r-none border-r border-r-surface-200"
                        color="surface"
                        disabled={Number(percentage) !== 0}
                        name="amount"
                        placeholder="€ 450"
                        oninput={onChangeProperty(i, 'amount')}
                    />
                    <Input
                        class="w-[4.5rem] rounded-l-none border-l-0 hover:border-l-0"
                        color="surface"
                        disabled={Number(amount) !== 0}
                        name="percentage"
                        placeholder="% 50"
                        oninput={onChangeProperty(i, 'percentage')}
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

    <p class="color-surface-600 ml-auto text-sm italic">Total income allocated: 200%</p>
    <TextIconButton
        class="ml-auto"
        color="surface"
        Icon={Plus}
        label="New allocation"
        onclick={onNewAllocation}
    />
</div>
