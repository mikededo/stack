<script lang="ts">
    import type { Snippet } from 'svelte';

    type Props = { children: Snippet };
    const { children }: Props = $props();
</script>

<div class="grid grid-cols-2 gap-4 xl:grid-cols-3">
    {@render children()}
</div>
