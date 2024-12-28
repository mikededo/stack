<script lang="ts">
    import { Banner } from '@stack/ui';

    type Props = {
        notImplemented: boolean;
    };
    const { notImplemented }: Props = $props();
</script>

<Banner header="Small device detected!" class="md:hidden">
    While I've tried to make an effort to make the visualization of this problem as responsive as possible, I stronhly recommend viewing this visualization in larger screens, or in horizontal mode!
</Banner>

{#if notImplemented}
    <Banner variant="destructive" class="mt-4 rounded-md md:hidden">
        This visualization is not adapted to small devices and the output may not be correctly visualized.
    </Banner>
{/if}
