<script lang="ts">
    import type { HTMLInputAttributes } from 'svelte/elements';
    import { twMerge } from 'tailwind-merge';

    type InputColor = 'primary' | 'secondary';

    type Props = HTMLInputAttributes & {
        label?: string;
        invalid?: boolean;
        color?: InputColor;
    };
    let { color, label, name, invalid, value = $bindable<string>(''), ...rest }: Props = $props();

    const COLORS: Record<InputColor, string> = {
        primary: 'focus:ui-border-primary active:ui-border-primary input',
        secondary:
            'ui-bg-primary-50 ui-border-transparent hover:ui-border-secondary-100 active:ui-border-secondary'
    };

    let classes = $derived(
        twMerge(
            'ui-h-10 ui-rounded ui-border ui-px-4 ui-outline-none ui-transition-colors',
            COLORS[color ?? 'primary'],
            invalid &&
                'hover:ui-border-desctructive ui-border-destructive focus:ui-border-destructive active:ui-border-destructive',
            rest.class
        )
    );
</script>

{#snippet content()}
    <input {...rest} bind:value {name} aria-invalid={invalid} class={classes} />
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
