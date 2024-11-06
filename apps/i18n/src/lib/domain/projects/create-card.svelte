<script lang="ts">
    import { gotoWithParams } from '$lib/config';

    const handleOnCreate = () => {
        gotoWithParams({ dialog: 'create-project' });
    };
</script>

<button
    class="flex h-40 w-full cursor-pointer items-center justify-center rounded border border-dashed outline-none transition-all hover:bg-surface active:scale-[0.985]"
    on:click={handleOnCreate}
>
    <p class="text-surface-500">Create a new project</p>
</button>
