<script context="module" lang="ts">
    export type Props = BaseProps &
        ((HTMLAnchorAttributes & { href: string }) | (HTMLButtonAttributes & { href?: never }));
</script>

<script lang="ts">
    import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

    import { type BaseProps, sharedClasses } from './styles';

    let { variant = 'default', color = 'primary', children, ...restProps }: Props = $props();

    restProps = {
        ...restProps,
        'aria-disabled': restProps.disabled ? 'true' : restProps['aria-disabled']
    };

    const classes = sharedClasses({
        variant,
        color,
        className: restProps.class
    });
</script>

{#if 'href' in restProps}
    <a {...restProps as HTMLAnchorAttributes} href={restProps.href} class={classes}>
        {#if children}
            {@render children()}
        {/if}
    </a>
{:else}
    <button {...restProps} class={classes}>
        {#if children}
            {@render children()}
        {/if}
    </button>
{/if}
