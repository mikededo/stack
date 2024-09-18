<script lang="ts">
    import type { Icon as LucideIcon } from 'lucide-svelte';
    import type { ComponentType } from 'svelte';

    import { twMerge } from 'tailwind-merge';

    import type { ButtonProps } from './index.js';

    import Button from './button.svelte';

    type Props = {
        Icon: ComponentType<LucideIcon>;
        label: string;
        children?: never;
    } & ButtonProps;
    let { Icon, label, ...props }: Props = $props();

    let buttonClasses = $derived(
        twMerge('ui-flex ui-h-10 ui-items-center ui-gap-2 ui-rounded-full ui-text-sm', props.class)
    );
</script>

<Button {...props} class={buttonClasses}>
    <svelte:component this={Icon} class="size-4" />
    <span>{label}</span>
</Button>
