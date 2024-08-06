<script lang="ts">
    import { type ActionArray, useActions, useAutofocus } from '@mstack/actions';

    import type { Action } from 'svelte/action';
    import type { HTMLInputAttributes, KeyboardEventHandler } from 'svelte/elements';

    type Props = HTMLInputAttributes & {
        use?: ActionArray;
        onConfirm?: () => void;
        onCancel?: () => void;
    };
    let {
        value = $bindable(),
        use = [],
        autofocus,
        onConfirm,
        onCancel,
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
    placeholder="Tag name..."
    class="w-full bg-transparent outline-none"
    onkeydown={handleOnNameKeydown}
    bind:value
    use:useActions={[...use, withAutofocus]}
/>
