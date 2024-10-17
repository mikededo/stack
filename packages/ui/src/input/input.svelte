<script lang="ts">
    import type { ActionArray } from '@stack/actions';

    import type { HTMLInputAttributes } from 'svelte/elements';

    import { useActions } from '@stack/actions';

    import { twMerge } from 'tailwind-merge';

    type InputColor = 'destructive' | 'primary' | 'surface';

    type Props = {
        color?: InputColor;
        invalid?: boolean;
        label?: string;
        ref?: HTMLInputElement;
        use?: ActionArray;
    } & HTMLInputAttributes;
    let {
        color,
        invalid,
        label,
        name,
        ref = $bindable<HTMLInputElement>(),
        use = [],
        value = $bindable<string>(''),
        ...rest
    }: Props = $props();

    const COLORS: Record<InputColor, string> = {
        destructive: 'ui-bg-destructive-50 ui-border-destructive-500 ui-text-destructive-500',
        primary: 'focus:ui-border-primary active:ui-border-primary input',
        surface:
            'ui-bg-surface-50 ui-border-transparent hover:ui-border-surface-200 focus:ui-border-surface-200 active:ui-border-surface-200 disabled:ui-bg-surface-100'
    };

    const classes = $derived(
        twMerge(
            'ui-h-10 ui-rounded ui-border ui-px-4 ui-outline-none ui-transition-colors disabled:ui-cursor-not-allowed',
            COLORS[color ?? 'primary'],
            invalid && 'hover:ui-border-desctructive ui-border-destructive focus:ui-border-destructive active:ui-border-destructive',
            rest.class
        )
    );
</script>

{#snippet content()}
    <input
        {...rest}
        class={classes}
        bind:this={ref}
        bind:value
        use:useActions={use}
        aria-invalid={invalid}
        {name}
    />
{/snippet}

{#if label}
    <div class="ui-flex ui-flex-col ui-gap-2">
        <label class="ui-text-xs ui-font-semibold ui-uppercase" for={name}>{label}</label>
        {@render content()}
    </div>
{:else}
    {@render content()}
{/if}

<style lang="postcss">
    .input:focus {
        box-shadow: inset 0 0 0 1px theme('colors.primary.500');
    }

    .input[aria-invalid='true']:focus {
        box-shadow: inset 0 0 0 1px theme('colors.destructive.500');
    }
</style>
