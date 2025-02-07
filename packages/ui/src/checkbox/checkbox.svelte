<script lang="ts">
    import { Check } from 'lucide-svelte';
    import { twMerge } from 'tailwind-merge';

    type Props = {
        label: string;
        name: string;
        checked?: boolean;
        class?: string;
        labelPosition?: 'left' | 'right';
    };
    let { checked = $bindable(false), label, labelPosition, name, ...restProps }: Props = $props();

    const classes = $derived(
        twMerge(
            'checkbox ui:size-4 ui:rounded-sm ui:border ui:border-surface-200 ui:text-primary ui:transition-all ui:focus:border-primary ui:aria-checked:bg-primary ui:aria-checked:border-primary',
            restProps.class
        )
    );
    const flexDirection = $derived(labelPosition === 'left' ? 'ui:flex-row' : 'ui:flex-row-reverse');

    const onClick = () => {
        checked = !checked;
    };
</script>

<div class="ui:flex ui:items-center ui:gap-2 {flexDirection}">
    <button
        class={classes}
        aria-checked={checked}
        aria-label={label}
        data-state={checked ? 'checked' : 'unchecked'}
        id={name}
        role="checkbox"
        type="button"
        value="on"
        onclick={onClick}
    >
        <Check class="ui:size-3.5 ui:stroke-white" strokeWidth={2.5} />
    </button>
    <label class="ui:text-sm" for={name}>{label}</label>
</div>

<style>
    @reference '../styles.css';

    .checkbox:focus {
        box-shadow: 0 0 0 4px theme(--color-primary-100);
    }
</style>
