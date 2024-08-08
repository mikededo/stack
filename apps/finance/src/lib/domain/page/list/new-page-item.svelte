<script lang="ts">
    import type { KeyboardEventHandler } from 'svelte/elements';

    import { useAutofocus } from '@mstack/actions';
    import { getUserDataContext } from '@mstack/svelte-supabase';

    import PageItem from './page-item.svelte';

    type Props = {
        onCancel?: () => void;
        onConfirm?: (pageName: string) => void;
    };
    let { onCancel, onConfirm }: Props = $props();

    let user = getUserDataContext();

    const handleOnBlur = () => {
        onCancel?.();
    };

    const handleOnKeydown: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Escape') {
            onCancel?.();
        } else if (event.key === 'Enter') {
            onConfirm?.(event.currentTarget.value);
        }
    };
</script>

<PageItem createdAt={new Date()} owner={user.first_name[0]}>
    {#snippet name()}
        <input
            class="w-full bg-transparent outline-none"
            use:useAutofocus
            onblur={handleOnBlur}
            onkeydown={handleOnKeydown}
            placeholder="Page name..."
        />
    {/snippet}
</PageItem>
