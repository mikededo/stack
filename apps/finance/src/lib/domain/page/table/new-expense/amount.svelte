<script lang="ts">
    import { type ActionArray, useActions, useAutofocus, useMoneyMask } from '@mstack/actions';

    type Props = { value?: string; forceFocus?: boolean; use?: ActionArray };
    let { value = $bindable(''), forceFocus, use = [] }: Props = $props();

    const actions = $derived<ActionArray>(
        forceFocus ? [...use, useAutofocus, useMoneyMask] : [...use, useMoneyMask]
    );
</script>

<input
    name="amount"
    bind:value
    class="w-full outline-none hover:bg-secondary-50 group-hover:bg-secondary-50 group-aria-current:bg-secondary-50"
    placeholder="€ xx.xx"
    use:useActions={actions}
/>
