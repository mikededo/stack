<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    import { twMerge } from 'tailwind-merge';

    type Props = {
        header?: string;
        variant?: 'default' | 'destructive' | 'info' | 'positive' | 'warning';
    } & HTMLAttributes<HTMLDivElement>;
    const { header, variant = 'default', ...rest }: Props = $props();

    const classes = twMerge(
        'ui-rounded-md ui-px-4 ui-py-2 ui-text-sm',
        variant === 'default' && 'ui-bg-slate-100',
        variant === 'destructive' && 'ui-bg-destructive-100 ui-text-destructive-500',
        variant === 'info' && 'ui-bg-info-100 ui-text-info-500',
        variant === 'positive' && 'ui-bg-positive-100 ui-text-positive-500',
        variant === 'warning' && 'ui-bg-warning-100 ui-text-positive-500',
        rest.class
    );
</script>

<div class={classes}>
    {#if header}
        <span class="ui-font-bold">{header}</span>
    {/if}
    {@render rest.children?.()}
</div>
