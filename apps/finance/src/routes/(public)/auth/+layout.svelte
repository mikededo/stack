<script lang="ts">
    import type { Snippet } from 'svelte';

    import { Auth } from '@stack/layouts';

    type Props = { children: Snippet };
    const { children }: Props = $props();
</script>

<Auth appName="Finance" {children} />
