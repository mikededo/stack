<script lang="ts">
    import type { Snippet } from 'svelte';

    import { useBlockScroll } from '@stack/actions';

    import { X } from 'lucide-svelte';
    import { fade } from 'svelte/transition';
    import { twMerge } from 'tailwind-merge';

    import { IconButton } from '../icon-button/index.js';

    type Props = {
        children: Snippet;
        onClose: () => void;
        class?: string;
        header?: Snippet;
        footer?: Snippet;
    };
    const { children, class: dialogClasses, footer, header, onClose }: Props = $props();

    const classes = $derived(
        twMerge(
            'border-border flex max-h-[80%] min-h-fit w-full min-w-[480px] max-w-lg flex-col overflow-hidden rounded border bg-background shadow-lg transition-all',
            dialogClasses
        )
    );
</script>

<div
    class="fixed inset-0 bg-black/50"
    role="presentation"
    transition:fade={{ duration: 150 }}
></div>
<div
    class="fixed inset-0 z-50 flex items-center justify-center"
    use:useBlockScroll
    role="dialog"
    transition:fade={{ duration: 150 }}
>
    <div class={classes} aria-modal="true">
        {#if header}
            <div class="flex w-full items-center justify-between p-5">
                <h2 class="text-xl font-semibold">
                    {@render header()}
                </h2>
                <IconButton color="muted" Icon={X} onclick={onClose} />
            </div>
        {/if}
        <div class="relative flex flex-1 flex-col gap-4 overflow-y-auto px-5">
            {@render children()}
        </div>
        {#if footer}
            <div class="p-5">
                {@render footer()}
            </div>
        {/if}
    </div>
</div>
