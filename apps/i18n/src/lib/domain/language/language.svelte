<script lang="ts">
    import { twMerge } from 'tailwind-merge';

    type Props = {
        isDefault: boolean | null;
        code: null | string;
    };
    const { code, isDefault }: Props = $props();

    const classes = $derived(
        twMerge('rounded-full bg-surface-100 px-2 py-0.5 font-semibold', isDefault && 'bg-primary text-white')
    );
</script>

{#if code}
    <p class={classes}>
        {code.toUpperCase()}
    </p>
{/if}
