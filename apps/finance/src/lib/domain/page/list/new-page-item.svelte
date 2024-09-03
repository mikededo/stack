<script lang="ts">
    import type { KeyboardEventHandler } from 'svelte/elements';

    import { useAutofocus } from '@stack/actions';
    import { getUserDataContext } from '@stack/svelte-supabase';

    import PageItem from './page-item.svelte';

    type Props = {
        onCancel?: () => void;
        onConfirm?: () => void;
        value?: string;
    };
    let { onCancel, onConfirm, value = $bindable() }: Props = $props();

    let user = getUserDataContext();

    const onKeydown: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Escape') {
            onCancel?.();
        } else if (event.key === 'Enter') {
            onConfirm?.();
        }
    };
</script>

<PageItem createdAt={new Date()} owner={user.first_name[0]}>
    {#snippet name()}
        <input
            class="w-full bg-transparent outline-none"
            bind:value
            use:useAutofocus
            placeholder="Page name..."
            onkeydown={onKeydown}
        />
    {/snippet}
</PageItem>
