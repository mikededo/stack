<script lang="ts" context="module">
    type Crumb = { label: string; href: string };
    export type Crumbs = [...Crumb[], Crumb & { href?: undefined }];
</script>

<script lang="ts">
    type Props = { breadcrumbs: Crumbs };
    let { breadcrumbs }: Props = $props();
</script>

<nav aria-label="Breadcrumbs">
    <ol class="ui-flex ui-flex-row ui-gap-1 ui-text-sm ui-text-secondary-300 ui-duration-75">
        {#each breadcrumbs as crumb, i (i)}
            {#if crumb.href}
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
