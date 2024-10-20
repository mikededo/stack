<script lang="ts">
    import type { ActionArray } from '@stack/actions';

    import { useActions, useMoneyMask } from '@stack/actions';

    import { useField } from './use-field';

    type Props = { use?: ActionArray; value?: string };
    let { use = [], value = $bindable('') }: Props = $props();
</script>

<input
    class="w-full outline-none group-hover:bg-primary-50 group-aria-current:bg-primary-50 hover:bg-primary-50"
    bind:value
    use:useActions={[...use, [useField, { actions: [useMoneyMask] }]]}
    name="amount"
    placeholder="€ xx.xx"
/>
