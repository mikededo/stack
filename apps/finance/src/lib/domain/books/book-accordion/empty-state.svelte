<script lang="ts">
    import { CircleSlash2 } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    import { CreateBookDialog, showDialog } from '$lib/domain/dialog';

    const onClick = () => {
        showDialog('CREATE_BOOK');
    };
</script>

<button
    class="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-surface-200 p-3 text-center text-sm text-surface-700 outline-none transition-all hover:border-primary-300"
    transition:fade={{ delay: 100, duration: 100 }}
    onclick={onClick}
>
    <CircleSlash2 class="size-4" />
    <p>Empty books?! Create a new one!</p>
</button>

<CreateBookDialog />
