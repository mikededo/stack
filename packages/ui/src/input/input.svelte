<script lang="ts">
    import type { ActionArray } from '@stack/actions';

    import type { HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements';

    import { useActions } from '@stack/actions';

    import { twMerge } from 'tailwind-merge';

    type InputColor = 'destructive' | 'primary' | 'surface';
    type BaseProps = {
        class?: string;
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
        destructive: 'bg-destructive-50 border-destructive-500 text-destructive-500',
        primary: 'hover:border-primary focus:border-primary active:border-primary input',
        surface:
            'bg-surface-50 border-transparent hover:border-surface-200 focus:border-surface-200 active:border-surface-200 disabled:bg-surface-100'
    };

    const classes = $derived(
        twMerge(
            COLORS[color ?? 'primary'],
            'h-10 rounded border px-3 outline-hidden transition-all disabled:cursor-not-allowed disabled:border-border shadow-none',
            invalid && 'hover:border-desctructive border-destructive focus:border-destructive active:border-destructive',
            rest.multiline && 'resize-none scrollbar-thin py-1.5',
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
    <div class="flex flex-col gap-2 w-full">
        <label class="text-xs font-semibold uppercase" for={name}>{label}</label>
        {@render content()}
    </div>
{:else}
    {@render content()}
{/if}

<style>
    .input:focus {
        box-shadow: 0 0 0 4px var(--color-primary-100);
    }

    .input[aria-invalid='true']:focus {
        box-shadow: 0 0 0 4px var(--color-destructive-100);
    }
</style>
