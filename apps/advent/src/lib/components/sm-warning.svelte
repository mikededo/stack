<script lang="ts">
    type Props = {
        notImplemented: boolean;
    };
    const { notImplemented }: Props = $props();
</script>

<div class="rounded-md bg-slate-100 px-4 py-2 text-sm md:hidden">
    <span class="font-bold">Small device detected!</span> While I've tried to make an effort to make the visualization of this problem as responsive as possible, I stronhly recommend viewing this visualization in larger screens, or in horizontal mode!
</div>

{#if notImplemented}
    <div class="mt-4 rounded-md bg-destructive-100 px-4 py-2 text-sm text-destructive-500 md:hidden">
        This visualization is not adapted to small devices and the output may not be correctly visualized.
    </div>
{/if}
