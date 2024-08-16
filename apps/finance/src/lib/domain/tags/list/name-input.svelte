<script lang="ts">
    import type { Action } from 'svelte/action';
    import type { HTMLInputAttributes, KeyboardEventHandler } from 'svelte/elements';

    import { type ActionArray, useActions, useAutofocus } from '@stack/actions';

    type Props = {
        onCancel?: () => void;
        onConfirm?: () => void;
        use?: ActionArray;
    } & HTMLInputAttributes;
    let {
        autofocus,
        onCancel,
        onConfirm,
        use = [],
        value = $bindable(),
        ...rest
    }: Props = $props();

    const withAutofocus: Action = (node) => (autofocus ? useAutofocus(node) : undefined);

    const handleOnNameKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            onConfirm?.();
            return;
        }

        if (e.key === 'Escape') {
            onCancel?.();
        }
    };
</script>

<input
    {...rest}
    class="w-full bg-transparent outline-none"
    bind:value
    use:useActions={[...use, withAutofocus]}
    placeholder="Tag name..."
    onkeydown={handleOnNameKeydown}
/>
