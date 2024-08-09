<script lang="ts">
    import { type ActionArray, useActions, useAutofocus, useMoneyMask } from '@mstack/actions';

    type Props = { forceFocus?: boolean; use?: ActionArray; value?: string };
    let { forceFocus, use = [], value = $bindable('') }: Props = $props();

    const actions = $derived<ActionArray>(
        forceFocus ? [...use, useAutofocus, useMoneyMask] : [...use, useMoneyMask]
    );
</script>

<input
    class="hover:bg-secondary-50 group-hover:bg-secondary-50 group-aria-current:bg-secondary-50 w-full outline-none"
    bind:value
    use:useActions={actions}
    name="amount"
    placeholder="€ xx.xx"
/>
