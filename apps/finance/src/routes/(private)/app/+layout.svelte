<script lang="ts">
    import type { ComponentType, Snippet } from 'svelte';

    import { Content01 } from '@stack/layouts';
    import { setUserDataContext } from '@stack/supabase';

    import type { LayoutData } from './$types';

    import {
        DollarSign,
        LayoutDashboard,
        Icon as LucideIcon,
        PiggyBank
    } from 'lucide-svelte';

    import { page } from '$app/stores';
    import { isNestedPath, pathTo } from '$lib/config';

    type Props = { children: Snippet; data: LayoutData };
    const { children, data }: Props = $props();

    setUserDataContext(data.user);

    type Tab = { href: string; name: string; Icon: ComponentType<LucideIcon>; disabled?: boolean };
    const tabs: Tab[] = [
        { href: pathTo('app'), Icon: LayoutDashboard, name: 'Dashboard' },
        { href: pathTo('budget'), Icon: PiggyBank, name: 'Budget' },
        { disabled: true, href: '/expenses', Icon: DollarSign, name: 'Expenses' }
    ];

    const isPageActive = (href: string): boolean => href === $page.url.pathname || isNestedPath(href, $page.url.pathname);
</script>

<Content01
    pathname={data.pathname}
    tabs={tabs}
    userName={data.user.first_name}
    {isPageActive}
>
    {@render children()}
</Content01>

