<script lang="ts">
    import type { HTMLInputAttributes } from 'svelte/elements';

    import { twMerge } from 'tailwind-merge';

    type InputColor = 'primary' | 'secondary';

    type Props = {
        color?: InputColor;
        invalid?: boolean;
        label?: string;
    } & HTMLInputAttributes;
    let { color, invalid, label, name, value = $bindable<string>(''), ...rest }: Props = $props();

    const COLORS: Record<InputColor, string> = {
        primary: 'focus:ui-border-primary active:ui-border-primary input',
        secondary:
            'ui-bg-secondary-50 ui-border-transparent hover:ui-border-secondary-200 active:ui-border-secondary-200'
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
    <input {...rest} class={classes} bind:value aria-invalid={invalid} {name} />
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
