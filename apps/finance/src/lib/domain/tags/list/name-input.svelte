<script lang="ts">
    import type { ActionArray } from '@stack/actions';

    import type { Action } from 'svelte/action';
    import type { HTMLInputAttributes, KeyboardEventHandler } from 'svelte/elements';

    import { useActions, useAutofocus } from '@stack/actions';

    type Props = {
        use?: ActionArray;
        onCancel?: () => void;
        onConfirm?: () => void;
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

    const onNameKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
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
    class="w-full bg-transparent outline-hidden"
    bind:value
    use:useActions={[...use, withAutofocus]}
    placeholder="Tag name..."
    onkeydown={onNameKeydown}
/>
