<script lang="ts">
    import type { Snippet } from 'svelte';

    import { Content01 } from '@stack/layouts';
    import { setUserDataContext } from '@stack/supabase';

    import type { LayoutData } from './$types';

    import { onNavigate } from '$app/navigation';
    import { page } from '$app/stores';
    import { isHomePath } from '$lib/config';

    type Props = { children: Snippet; data: LayoutData };
    const { children, data }: Props = $props();

    setUserDataContext(data.user);

    let enableTransition = $state(isHomePath($page.url.pathname));
    const isPageActive = (href: string): boolean => href === $page.url.pathname;

    onNavigate((navigate) => {
        const from = navigate.from?.url.pathname ?? '';
        const to = navigate.to?.url.pathname ?? '';

        if (isHomePath(from) || isHomePath(to)) {
            enableTransition = true;
        } else if (enableTransition) {
            enableTransition = false;
        }
    });
</script>

<Content01
    pathname={data.pathname}
    transition={enableTransition}
    userName={data.user.first_name}
    {isPageActive}
>
    {@render children()}
</Content01>
