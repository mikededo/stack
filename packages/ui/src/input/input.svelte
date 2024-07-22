<script lang="ts">
    import type { HTMLInputAttributes } from 'svelte/elements';
    import { twMerge } from 'tailwind-merge';

    type Props = HTMLInputAttributes & { label?: string; invalid?: boolean };
    let { label, name, invalid, ...rest }: Props = $props();

    let classes = $derived(
        twMerge(
            'input ui-h-10 ui-rounded ui-border ui-px-4 ui-outline-none ui-transition-colors hover:ui-border-primary focus:ui-border-primary active:ui-border-primary',
            invalid &&
                'hover:ui-border-desctructive ui-border-destructive focus:ui-border-destructive active:ui-border-destructive',
            rest.class
        )
    );
</script>

<div class="ui-flex ui-flex-col ui-gap-2">
    {#if label}
        <label class="ui-text-xs ui-font-semibold ui-uppercase" for={name}>{label}</label>
    {/if}
    <input {...rest} {name} aria-invalid={invalid} class={classes} />
</div>

<style lang="postcss">
    .input:focus {
        box-shadow: inset 0 0 0 1px theme('colors.primary.500');
    }

    .input[aria-invalid='true']:focus {
        box-shadow: inset 0 0 0 1px theme('colors.destructive.500');
    }
</style>
