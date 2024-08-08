<script lang="ts">
    import type { ComponentType } from 'svelte';

    import { Icon as LucideIcon } from 'lucide-svelte';
    import { twMerge } from 'tailwind-merge';

    type Props = {
        active?: boolean;
        class?: string;
        Icon?: ComponentType<LucideIcon>;
        label: string;
        onClick: () => void;
    };
    let { active, Icon, label, onClick, ...restProps }: Props = $props();

    const classes = $derived(
        twMerge(
            'outline-none ui-flex ui-w-full ui-items-center ui-gap-2 ui-rounded-md ui-px-3 ui-py-2 ui-text-left ui-text-sm hover:ui-bg-secondary-50 focus:ui-bg-secondary-50 active:ui-bg-secondary-50',
            active && 'ui-bg-secondary-50 ui-font-semibold',
            restProps.class
        )
    );
</script>

<button class={classes} onclick={onClick} aria-current={active}>
    <svelte:component this={Icon} class="ui-size-4 ui-shrink-0" strokeWidth={active ? 2.25 : 2} />
    <span class="ui-shrink-0">{label}</span>
</button>
