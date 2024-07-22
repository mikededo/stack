<script lang="ts">
    import '../global.css';
    import '@mstack/ui/styles';
    import { setSupabaseClient } from '@mstack/svelte-supabase';

    import { QueryClientProvider } from '@tanstack/svelte-query';
    import type { Snippet } from 'svelte';

    import type { LayoutData } from './$types.js';

    type Props = {
        children: Snippet;
        data: LayoutData;
    };
    let { children, data }: Props = $props();

    setSupabaseClient(data.supabase);
</script>

<QueryClientProvider client={data.queryClient}>
    {@render children()}
</QueryClientProvider>
