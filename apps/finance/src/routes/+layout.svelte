<script lang="ts">
    import '../global.css';

    import type { Snippet } from 'svelte';

    import { setSupabaseClient } from '@mstack/svelte-supabase';
    import '@mstack/ui/styles';

    import { QueryClientProvider } from '@tanstack/svelte-query';
    import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';

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
    <SvelteQueryDevtools buttonPosition="top-right" />
</QueryClientProvider>
