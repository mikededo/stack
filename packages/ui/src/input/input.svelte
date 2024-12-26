<script lang="ts">
    import type { ActionArray } from '@stack/actions';

    import type { HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements';

    import { useActions } from '@stack/actions';

    import { twMerge } from 'tailwind-merge';

    type InputColor = 'destructive' | 'primary' | 'surface';
    type BaseProps = {
        invalid?: boolean;
        label?: string;
        use?: ActionArray;
        color?: InputColor;
    };
    type InputProps = {
        multiline?: never;
        ref?: HTMLInputElement;
    } & HTMLInputAttributes;
    type TextAreaProps = {
        multiline: true;
        ref?: HTMLTextAreaElement;
    } & HTMLTextareaAttributes;
    type Props = BaseProps & (InputProps | TextAreaProps);

    let {
        color,
        invalid,
        label,
        name,
        ref = $bindable<HTMLInputElement | HTMLTextAreaElement>(),
        use = [],
        value = $bindable<string>(''),
        ...rest
    }: Props = $props();

    const COLORS: Record<InputColor, string> = {
        destructive: 'ui-bg-destructive-50 ui-border-destructive-500 ui-text-destructive-500',
        primary: 'hover:ui-border-primary focus:ui-border-primary active:ui-border-primary input',
        surface:
            'ui-bg-surface-50 ui-border-transparent hover:ui-border-surface-200 focus:ui-border-surface-200 active:ui-border-surface-200 disabled:ui-bg-surface-100'
    };

    const classes = $derived(
        twMerge(
            COLORS[color ?? 'primary'],
            'ui-h-10 ui-rounded ui-border ui-px-3 ui-outline-none ui-transition-all disabled:ui-cursor-not-allowed disabled:ui-border-border ui-shadow-none',
            invalid && 'hover:ui-border-desctructive ui-border-destructive focus:ui-border-destructive active:ui-border-destructive',
            rest.multiline && 'ui-resize-none ui-scrollbar-thin ui-py-1.5',
            rest.class
        )
    );
</script>

{#snippet content()}
    {#if rest.multiline}
        <textarea
            {...rest}
            class={classes}
            bind:this={ref}
            bind:value
            use:useActions={use}
            aria-invalid={invalid}
            {name}
        ></textarea>
    {:else}
        <input
            {...rest}
            class={classes}
            bind:this={ref}
            bind:value
            use:useActions={use}
            aria-invalid={invalid}
            {name}
        />
    {/if}
{/snippet}

{#if label}
    <div class="ui-flex ui-flex-col ui-gap-2 ui-w-full">
        <label class="ui-text-xs ui-font-semibold ui-uppercase" for={name}>{label}</label>
        {@render content()}
    </div>
{:else}
    {@render content()}
{/if}

<style lang="postcss">
    .input:focus {
        box-shadow: 0 0 0 4px theme('colors.primary.100');
    }

    .input[aria-invalid='true']:focus {
        box-shadow: 0 0 0 4px theme('colors.destructive.100');
    }
</style>
