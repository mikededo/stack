<script lang="ts">
    import type { Crumbs } from './types.js';

    type Props = { breadcrumbs: Crumbs };
    const { breadcrumbs }: Props = $props();
</script>

<nav aria-label="Breadcrumbs">
    <ol class="flex flex-row gap-1 text-sm text-surface-500 duration-75">
        {#each breadcrumbs as crumb, i (i)}
            {#if crumb.href && i < breadcrumbs.length - 1}
                <li>
                    <a
                        class="transition-all hover:text-foreground hover:underline"
                        href={crumb.href}
                    >
                        {crumb.label}
                    </a>
                </li>
                <li aria-hidden="true">/</li>
            {:else}
                <li class="cursor-default text-foreground">
                    {crumb.label}
                </li>
            {/if}
        {/each}
    </ol>
</nav>
