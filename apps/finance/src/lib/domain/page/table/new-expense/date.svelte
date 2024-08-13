<script lang="ts">
    import { type ActionArray, useActions, useAutofocus, useDateMask } from '@mstack/actions';

    type Props = { disableAutofocus?: boolean; use?: ActionArray; value?: string };
    let { disableAutofocus, use = [], value = $bindable('') }: Props = $props();

    let actions = $derived<ActionArray>(
        disableAutofocus ? [...use, useDateMask] : [...use, useAutofocus, useDateMask]
    );
</script>

<input
    class="w-full outline-none group-hover:bg-primary-50 aria-invalid:text-destructive-500 group-aria-current:bg-primary-50 hover:bg-primary-50"
    bind:value
    use:useActions={actions}
    name="date"
    placeholder="dd/mm/yyyy"
/>
