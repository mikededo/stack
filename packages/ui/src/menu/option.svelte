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
        unstyled?: boolean;
        use?: ActionArray;
        Icon?: ComponentType<LucideIcon>;
        onClick?: () => void;
    };
    const { active, Icon, label, onClick, unstyled, use = [], ...restProps }: Props = $props();

    const classes = $derived(
        twMerge(
            'outline-none flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm',
            !unstyled && 'hover:bg-surface-50 focus:bg-surface-50 active:bg-surface-50',
            active && 'bg-surface-50 font-semibold',
            restProps.class
        )
    );
</script>

<button class={classes}
    use:useActions={use}
    aria-current={active}
    onclick={onClick}
>
    <Icon class="size-4 shrink-0" strokeWidth={active ? 2.25 : 2} />
    <span class="shrink-0">{label}</span>
</button>
