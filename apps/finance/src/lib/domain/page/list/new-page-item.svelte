<script lang="ts">
    import { useAutofocus } from '@mstack/actions';
    import { getUserDataContext } from '@mstack/svelte-supabase';

    import type { KeyboardEventHandler } from 'svelte/elements';

    import PageItem from './page-item.svelte';

    type Props = {
        onConfirm?: (pageName: string) => void;
        onCancel?: () => void;
    };
    let { onConfirm, onCancel }: Props = $props();

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

<PageItem owner={user.first_name[0]} createdAt={new Date()}>
    {#snippet name()}
        <input
            class="w-full bg-transparent outline-none"
            placeholder="Page name..."
            onblur={handleOnBlur}
            onkeydown={handleOnKeydown}
            use:useAutofocus
        />
    {/snippet}
</PageItem>
