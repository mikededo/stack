<script lang="ts">
    import type { Crumbs } from './types.js';

    type Props = { breadcrumbs: Crumbs };
    let { breadcrumbs }: Props = $props();
</script>

<nav aria-label="Breadcrumbs">
    <ol class="ui-flex ui-flex-row ui-gap-1 ui-text-sm ui-text-secondary-300 ui-duration-75">
        {#each breadcrumbs as crumb, i (i)}
            {#if crumb.href && i < breadcrumbs.length - 1}
                <li>
                    <a
                        href={crumb.href}
                        class="ui-transition-all hover:ui-text-foreground hover:ui-underline"
                    >
                        {crumb.label}
                    </a>
                </li>
                <li aria-hidden="true">/</li>
            {:else}
                <li class="ui-cursor-default ui-text-foreground">
                    {crumb.label}
                </li>
            {/if}
        {/each}
    </ol>
</nav>
