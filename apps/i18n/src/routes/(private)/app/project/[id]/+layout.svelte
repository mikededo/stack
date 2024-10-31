<script lang="ts">
    import type { Snippet } from 'svelte';

    import type { LayoutData } from './$types';

    import { error } from '@sveltejs/kit';

    type Props = { children: Snippet; data: LayoutData };
    const { children, data }: Props = $props();

    $effect(() => {
        if (Number.isNaN(+data.id)) {
            error(404, 'Project not found');
        }
    });

</script>

{@render children()}

<!-- <CreatePhraseDialog projectId={+slug} /> -->
<!-- <DeletePhraseDialog projectId={+slug} /> -->
