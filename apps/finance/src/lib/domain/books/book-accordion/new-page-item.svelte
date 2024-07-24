<script lang="ts">
    import { getUserDataContext } from '@mstack/svelte-supabase';

    import type { Action } from 'svelte/action';

    import PageItem from './page-item.svelte';

    type Props = {
        onConfirm?: (pageName: string) => void;
        onCancel?: () => void;
    };
    let { onConfirm, onCancel }: Props = $props();

    let user = getUserDataContext();

    const autofocus: Action<HTMLInputElement> = (node) => {
        node.focus();

        node.addEventListener('blur', () => {
            onCancel?.();
        });

        node.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                // ESC
                onCancel?.();
            } else if (event.key === 'Enter') {
                // ENTER
                onConfirm?.(node.value);
            }
        });
    };
</script>

<PageItem owner={user.first_name[0]} createdAt={new Date()}>
    {#snippet name()}
        <input
            use:autofocus
            placeholder="Page name..."
            class="w-full bg-transparent outline-none"
        />
    {/snippet}
</PageItem>
