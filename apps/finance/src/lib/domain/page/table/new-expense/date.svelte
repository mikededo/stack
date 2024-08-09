<script lang="ts">
    import { type ActionArray, useActions, useAutofocus, useDateMask } from '@mstack/actions';

    type Props = { disableAutofocus?: boolean; use?: ActionArray; value?: string };
    let { disableAutofocus, use = [], value = $bindable('') }: Props = $props();

    let actions = $derived<ActionArray>(
        disableAutofocus ? [...use, useDateMask] : [...use, useAutofocus, useDateMask]
    );
</script>

<input
    class="hover:bg-secondary-50 group-hover:bg-secondary-50 group-aria-current:bg-secondary-50 w-full outline-none aria-invalid:text-destructive-500"
    bind:value
    use:useActions={actions}
    name="date"
    placeholder="dd/mm/yyyy"
/>
