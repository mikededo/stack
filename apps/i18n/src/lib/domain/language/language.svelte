<script lang="ts">
    import { twMerge } from 'tailwind-merge';

    type Props = {
        code: null | string;
        isDefault: boolean | null;
    };
    const { code, isDefault }: Props = $props();

    const classes = $derived(
        twMerge('rounded-full bg-muted px-2 py-0.5 font-semibold', isDefault && 'bg-primary text-white')
    );
</script>

{#if code}
    <p class={classes}>
        {code.toUpperCase()}
    </p>
{/if}
