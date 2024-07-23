<script lang="ts">
    import { setUserDataContext } from '@mstack/svelte-supabase';

    import type { Snippet } from 'svelte';

    import type { LayoutData } from './$types';

    type Props = { data: LayoutData; children: Snippet };
    let { data, children }: Props = $props();

    setUserDataContext(data.user);
</script>

{@render children()}
