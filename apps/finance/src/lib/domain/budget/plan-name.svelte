<script lang="ts">
    import { useAnimatedPlaceholder } from './animated-placeholder.svelte';
</script>

<div class="flex flex-col gap-2 md:mb-2">
    <label class="text-xs font-semibold uppercase" for="plan-name">Plan name</label>
    <input
        class="w-full text-2xl font-semibold outline-none placeholder-shown:italic"
        use:useAnimatedPlaceholder
    />
</div>
