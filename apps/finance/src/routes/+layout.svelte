<script lang="ts">
    import '../global.css';

    import type { Snippet } from 'svelte';

    import { setSupabaseClient } from '@stack/supabase';

    import type { LayoutData } from './$types.js';

    import { QueryClientProvider } from '@tanstack/svelte-query';
    import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';

    type Props = {
        children: Snippet;
        data: LayoutData;
    };
    const { children, data }: Props = $props();

    setSupabaseClient(data.supabase);
</script>

<QueryClientProvider client={data.queryClient}>
    {@render children()}
    <SvelteQueryDevtools buttonPosition="bottom-left" />
</QueryClientProvider>
