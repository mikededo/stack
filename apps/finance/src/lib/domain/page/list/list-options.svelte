<script lang="ts">
    import { Input } from '@mstack/ui';

    import type { Snippet } from 'svelte';

    import { getListContext } from './context.svelte';

    type Props = { children: Snippet };
    let { children }: Props = $props();

    let listState = getListContext();
</script>

<div class="flex flex-row items-center justify-end gap-0.5 md:gap-1">
    <Input
        bind:value={listState.keywords}
        placeholder="Search pages"
        color="secondary"
        class="mr-auto w-full max-w-96 text-sm"
    />
    {@render children()}
</div>
