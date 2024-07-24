<script context="module" lang="ts">
    export type Props = BaseProps &
        ((HTMLAnchorAttributes & { href: string }) | (HTMLButtonAttributes & { href?: never }));
</script>

<script lang="ts">
    import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

    import { type BaseProps, sharedClasses } from './styles';

    let { variant = 'default', color = 'primary', children, ...restProps }: Props = $props();

    let elementProps = $derived({
        ...restProps,
        'aria-disabled': restProps.disabled ? 'true' : restProps['aria-disabled']
    });

    const classes = sharedClasses({
        variant,
        color,
        className: restProps.class
    });
</script>

{#if 'href' in elementProps}
    <a {...elementProps as HTMLAnchorAttributes} href={elementProps.href} class={classes}>
        {#if children}
            {@render children()}
        {/if}
    </a>
{:else}
    <button {...elementProps} class={classes}>
        {#if children}
            {@render children()}
        {/if}
    </button>
{/if}
