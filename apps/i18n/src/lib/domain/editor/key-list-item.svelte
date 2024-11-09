<script lang="ts">
    import type { ProjectKey } from '$lib/db';

    import { CheckCircle2, Circle } from 'lucide-svelte';
    import { scale } from 'svelte/transition';

    import { page } from '$app/stores';
    import { buildURLParams, getParamValues } from '$lib/config';

    type Props = { key: ProjectKey };
    const { key }: Props = $props();
    const { description, key_name: name } = key;

    const selectedKey = $derived(getParamValues($page.url, 'keyId'));
    const href = $derived(buildURLParams({ keyId: name }));
</script>

<li
    class="group"
    aria-current={selectedKey === name}
>
    <a
        class="px-3 flex flex-col py-1.5 hover:bg-primary-50 transition-colors outline-none group-aria-current:bg-primary-50"
        href="?{href}"
    >
        <div class="flex items-center justify-between">
            <p>{name}</p>
            {#if selectedKey === name}
                <div in:scale={{ duration: 100 }}>
                    <CheckCircle2 class="mt-0.5 size-4 text-primary" />
                </div>
            {:else}
                <div in:scale={{ duration: 100 }}>
                    <Circle class="mt-0.5 size-4" />
                </div>
            {/if}
        </div>
        <div class="flex items-center justify-between w-full">
            <p
                class="text-sm text-surface-600"
                class:italic={!description}
                class:line-clamp-1={!!description}
            >
                {description ?? '-'}
            </p>
        </div>
    </a>
</li>
