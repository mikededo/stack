<script lang="ts">
    import type { ActionArray } from '@stack/actions';

    import type { ComponentType } from 'svelte';

    import { useActions } from '@stack/actions';

    import { Icon as LucideIcon } from 'lucide-svelte';
    import { twMerge } from 'tailwind-merge';

    type Props = {
        label: string;
        active?: boolean;
        class?: string;
        Icon?: ComponentType<LucideIcon>;
        unstyled?: boolean;
        use?: ActionArray;
        onClick?: () => void;
    };
    const { active, Icon, label, onClick, unstyled, use = [], ...restProps }: Props = $props();

    const classes = $derived(
        twMerge(
            'outline-none ui-flex ui-w-full ui-items-center ui-gap-2 ui-rounded-md ui-px-3 ui-py-2 ui-text-left ui-text-sm',
            !unstyled && 'hover:ui-bg-surface-50 focus:ui-bg-surface-50 active:ui-bg-surface-50',
            active && 'ui-bg-surface-50 ui-font-semibold',
            restProps.class
        )
    );
</script>

<button class={classes}
    use:useActions={use}
    aria-current={active}
    onclick={onClick}>
    <svelte:component this={Icon} class="ui-size-4 ui-shrink-0" strokeWidth={active ? 2.25 : 2} />
    <span class="ui-shrink-0">{label}</span>
</button>
