<script lang="ts">
    import { type ActionArray, useActions, useAutofocus, useDateMask } from '@mstack/actions';

    type Props = { disableAutofocus?: boolean; defaultValue?: string };
    let { disableAutofocus, defaultValue }: Props = $props();

    let actions = $derived<ActionArray>(
        disableAutofocus ? [useDateMask] : [useAutofocus, useDateMask]
    );
</script>

<input
    name="date"
    value={defaultValue}
    class="w-full outline-none hover:bg-secondary-50 group-hover:bg-secondary-50 aria-invalid:text-destructive-500"
    placeholder="dd/mm/yyyy"
    use:useActions={actions}
/>
