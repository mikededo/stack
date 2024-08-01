<script lang="ts">
    import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

    import { getIconClasses, getWrapperClasses } from './styles.js';
    import type { BaseProps } from './styles.js';

    type Props = BaseProps &
        ((HTMLAnchorAttributes & { href: string }) | (HTMLButtonAttributes & { href?: never }));

    let {
        Icon,
        size = 'default',
        color = 'primary',
        href,
        strokeWidth,
        wrapperClasses,
        iconClasses,
        ...restProps
    }: Props = $props();

    const iconProps = { strokeWidth };
    let wrapperClass = $derived(getWrapperClasses({ size, color, classes: wrapperClasses }));
    let iconClass = $derived(getIconClasses({ size, classes: iconClasses }));
</script>

{#if 'href' in restProps}
    <a {...restProps as HTMLAnchorAttributes} class={wrapperClass} {href}>
        <svelte:component this={Icon} class={iconClass} {...iconProps} />
    </a>
{:else}
    <button {...restProps as HTMLButtonAttributes} class={wrapperClass}>
        <svelte:component this={Icon} class={iconClass} {...iconProps} />
    </button>
{/if}
