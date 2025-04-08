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
        destructive: 'bg-destructive-500/25 text-destructive-500 border-destructive-500',
        info: 'bg-info-500/25 text-info-500 border-info-500',
        positive: 'bg-positive-500/25 text-positive-500 border-positive-500',
        primary: 'bg-primary-500/25 text-primary-500 border-primary-500',
        warning: 'bg-warning-300/25 text-warning-300 border-warning-500'
    };

    const classes = $derived(
        twMerge(
            'rounded-full bg-current px-2 py-1 text-xs font-semibold',
            variant !== undefined && COLORS[variant],
            onClick && 'flex items-center gap-1 outline-hidden transition-all hover:opacity-90 focus:ring-1 focus:ring-current focus-visible:scale-[0.975] focus-visible:outline-hidden active:scale-[0.975] disabled:cursor-not-allowed disabled:active:scale-100',
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
