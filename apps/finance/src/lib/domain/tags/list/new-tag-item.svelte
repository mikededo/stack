<script lang="ts" context="module">
    const AllowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
</script>

<script lang="ts">
    import { useAutofocus } from '@mstack/actions';
    import { Chip, ListItem } from '@mstack/ui';
    import { HEX_REGEX } from '@mstack/utils';

    import { Tag } from 'lucide-svelte';
    import type { KeyboardEventHandler } from 'svelte/elements';

    import { isTagValid } from './helpers';

    type Props = {
        name: string;
        color: string;
        onConfirm?: () => void;
        onCancel?: () => void;
    };
    let { name = $bindable(), color = $bindable(), onConfirm, onCancel }: Props = $props();

    const handleOnNameKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (isTagValid(name, color) && e.key === 'Enter') {
            onConfirm?.();
            return;
        }

        if (e.key === 'Escape') {
            onCancel?.();
        }
    };

    const handleOnColorKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (isTagValid(name, color) && e.key === 'Enter') {
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

<ListItem class="flex w-full items-center justify-between px-3 py-2">
    <div class="flex w-full items-center gap-2">
        <Tag class="size-4" strokeWidth={2.5} />
        <input
            bind:value={name}
            placeholder="Tag name..."
            class="w-full bg-transparent outline-none"
            onkeydown={handleOnNameKeydown}
            use:useAutofocus
        />
    </div>
    <div class="flex shrink-0 items-center gap-4">
        <Chip {color}>{name ? name : 'Tag name'}</Chip>
        <input
            bind:value={color}
            class="w-20 bg-transparent text-right text-sm uppercase outline-none"
            onkeydown={handleOnColorKeydown}
            onkeyup={handleOnColorKeyup}
        />
        <div class="size-5 rounded" style="background-color: {color}"></div>
    </div>
</ListItem>
