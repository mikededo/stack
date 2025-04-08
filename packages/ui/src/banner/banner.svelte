<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    import { twMerge } from 'tailwind-merge';

    type Props = {
        class?: string;
        header?: string;
        variant?: 'default' | 'destructive' | 'info' | 'positive' | 'warning';
    } & HTMLAttributes<HTMLDivElement>;
    const { header, variant = 'default', ...rest }: Props = $props();

    const classes = twMerge(
        'rounded-md px-4 py-2 text-sm',
        variant === 'default' && 'bg-slate-100',
        variant === 'destructive' && 'bg-destructive-100 text-destructive-500',
        variant === 'info' && 'bg-info-100 text-info-500',
        variant === 'positive' && 'bg-positive-100 text-positive-500',
        variant === 'warning' && 'bg-warning-100 text-positive-500',
        rest.class
    );
</script>

<div class={classes}>
    {#if header}
        <span class="font-bold">{header}</span>
    {/if}
    {@render rest.children?.()}
</div>
