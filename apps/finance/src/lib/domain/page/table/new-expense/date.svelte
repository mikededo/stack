<script lang="ts">
    import type { Action } from 'svelte/action';

    import { type ActionArray, useActions, useAutofocus, useDateMask } from '@stack/actions';

    type Props = { disableAutofocus?: boolean; use?: ActionArray; value?: string };
    let { disableAutofocus, use = [], value = $bindable('') }: Props = $props();

    const useInternalAutofocus: Action = (node) => {
        if (disableAutofocus) {
            return;
        }

        return useAutofocus(node);
    };
</script>

<input
    class="w-full outline-none group-hover:bg-primary-50 aria-invalid:text-destructive-500 group-aria-current:bg-primary-50 hover:bg-primary-50"
    bind:value
    use:useActions={[...use, useDateMask, useInternalAutofocus]}
    name="date"
    placeholder="dd/mm/yyyy"
/>
