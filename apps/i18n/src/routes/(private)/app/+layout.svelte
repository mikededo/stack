<script lang="ts">
    import type { ComponentType, Snippet } from 'svelte';

    import { Content01 } from '@stack/layouts';
    import { setUserDataContext } from '@stack/supabase';

    import type { LayoutData } from './$types';

    import { Icon as LucideIcon } from 'lucide-svelte';

    import { page } from '$app/stores';

    type Props = { children: Snippet; data: LayoutData };
    const { children, data }: Props = $props();

    setUserDataContext(data.user);

    type Tab = { href: string; Icon: ComponentType<LucideIcon>; name: string; disabled?: boolean };
    const tabs: Tab[] = [];

    const isPageActive = (href: string): boolean => href === $page.url.pathname;
</script>

<Content01
    pathname={data.pathname}
    tabs={tabs}
    userName={data.user.first_name}
    {isPageActive}
>
    {@render children()}
</Content01>
