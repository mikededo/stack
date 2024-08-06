<script lang="ts" context="module">
    const AllowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
</script>

<script lang="ts">
    import { type ActionArray, useActions, useAutofocus } from '@mstack/actions';
    import { HEX_REGEX } from '@mstack/utils';

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

    const handleOnColorKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            onConfirm?.();
            return;
        }

        if (e.key === 'Escape') {
            onCancel?.();
            return;
        }

        const length = e.currentTarget.value.length;
        if ((length >= 7 && AllowedKeys.includes(e.key)) || length < 7) {
            return;
        }

        // Do not allow more thant 7 characters
        e.preventDefault();
    };

    const handleOnColorKeyup: KeyboardEventHandler<HTMLInputElement> = (e) => {
        // Check if the first char is a #
        if (e.currentTarget.value[0] !== '#') {
            e.currentTarget.value = '#' + e.currentTarget.value;
        }

        if (!HEX_REGEX.test(e.currentTarget.value)) {
            e.currentTarget.classList.add('text-destructive-500');
        } else {
            e.currentTarget.classList.remove('text-destructive-500');
        }

        if (e.currentTarget.value.length === 1 && e.key === 'Backspace') {
            e.currentTarget.value = '#';
            e.preventDefault();
            return;
        }
    };
</script>

<input
    {...rest}
    bind:value
    class="w-20 bg-transparent text-right text-sm uppercase outline-none"
    onkeydown={handleOnColorKeydown}
    onkeyup={handleOnColorKeyup}
    use:useActions={[...use, withAutofocus]}
/>
