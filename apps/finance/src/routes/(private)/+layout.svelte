<script lang="ts">
    import type { Snippet } from 'svelte';

    import { setUserDataContext } from '@mstack/svelte-supabase';

    import type { LayoutData } from './$types';

    type Props = { children: Snippet; data: LayoutData };
    let { children, data }: Props = $props();

    setUserDataContext(data.user);
</script>

{@render children()}
