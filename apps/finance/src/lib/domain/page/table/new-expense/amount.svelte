<script lang="ts">
    import { type ActionArray, useActions, useAutofocus, useMoneyMask } from '@stack/actions';

    type Props = { forceFocus?: boolean; use?: ActionArray; value?: string };
    let { forceFocus, use = [], value = $bindable('') }: Props = $props();

    const actions = $derived<ActionArray>(
        forceFocus ? [...use, useAutofocus, useMoneyMask] : [...use, useMoneyMask]
    );
</script>

<input
    class="w-full outline-none group-hover:bg-primary-50 group-aria-current:bg-primary-50 hover:bg-primary-50"
    bind:value
    use:useActions={actions}
    name="amount"
    placeholder="€ xx.xx"
/>
