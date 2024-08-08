<script lang="ts">
    import { type ActionArray, useActions, useAutofocus, useDateMask } from '@mstack/actions';

    type Props = { disableAutofocus?: boolean; value?: string; use?: ActionArray };
    let { disableAutofocus, value = $bindable(''), use = [] }: Props = $props();

    let actions = $derived<ActionArray>(
        disableAutofocus ? [...use, useDateMask] : [...use, useAutofocus, useDateMask]
    );
</script>

<input
    bind:value
    name="date"
    class="w-full outline-none hover:bg-secondary-50 group-hover:bg-secondary-50 aria-invalid:text-destructive-500"
    placeholder="dd/mm/yyyy"
    use:useActions={actions}
/>
