<script lang="ts">
    import type { Crumbs } from './types.js';

    type Props = { breadcrumbs: Crumbs };
    const { breadcrumbs }: Props = $props();
</script>

<nav aria-label="Breadcrumbs">
    <ol class="ui:flex ui:flex-row ui:gap-1 ui:text-sm ui:text-surface-500 ui:duration-75">
        {#each breadcrumbs as crumb, i (i)}
            {#if crumb.href && i < breadcrumbs.length - 1}
                <li>
                    <a
                        class="ui:transition-all ui:hover:text-foreground ui:hover:underline"
                        href={crumb.href}
                    >
                        {crumb.label}
                    </a>
                </li>
                <li aria-hidden="true">/</li>
            {:else}
                <li class="ui:cursor-default ui:text-foreground">
                    {crumb.label}
                </li>
            {/if}
        {/each}
    </ol>
</nav>
