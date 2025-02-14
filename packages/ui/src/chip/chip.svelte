<script lang="ts">
    import type { Snippet } from 'svelte';

    import { X } from 'lucide-svelte';
    import { twMerge } from 'tailwind-merge';

    type ChipVariant = 'destructive' | 'info' | 'positive' | 'primary' | 'warning';

    type BaseProps = {
        children: Snippet;
        class?: string;
        onClick?: () => void;
    } & ({ color: string; variant?: never } | { variant: ChipVariant; color?: never });
    type Props = BaseProps;
    const { children, color, onClick, variant, ...restProps }: Props = $props();

    const COLORS: Record<ChipVariant, string> = {
        destructive: 'ui-bg-destructive-500/25 ui-text-destructive-500 ui-border-destructive-500',
        info: 'ui-bg-info-500/25 ui-text-info-500 ui-border-info-500',
        positive: 'ui-bg-positive-500/25 ui-text-positive-500 ui-border-positive-500',
        primary: 'ui-bg-primary-500/25 ui-text-primary-500 ui-border-primary-500',
        warning: 'ui-bg-warning-300/25 ui-text-warning-300 ui-border-warning-500'
    };

    const classes = $derived(
        twMerge(
            'ui-rounded-full ui-bg-current ui-px-2 ui-py-1 ui-text-xs ui-font-semibold',
            variant !== undefined && COLORS[variant],
            onClick && 'ui-flex ui-items-center ui-gap-1 ui-outline-none ui-transition-all hover:ui-opacity-90 focus:ui-ring-1 focus:ui-ring-current focus-visible:ui-scale-[0.975] focus-visible:ui-outline-none active:ui-scale-[0.975] disabled:ui-cursor-not-allowed disabled:active:ui-scale-100',
            restProps.class
        )
    );
    const style = $derived(variant ? undefined : `background-color: ${color}44; color: ${color}`);
</script>

{#if onClick}
    <button {...restProps}
        class={classes}
        {style}
        onclick={onClick}
    >
        {@render children()}
        <X size={14} strokeWidth={2.5} />
    </button>
{:else}
    <span {...restProps} class={classes} {style}>
        {@render children()}
    </span>
{/if}
