<script lang="ts">
    import { X } from 'lucide-svelte';
    import type { Snippet } from 'svelte';
    import { fade } from 'svelte/transition';
    import { twMerge } from 'tailwind-merge';

    import { IconButton } from '../icon-button/index.js';

    type Props = {
        header: Snippet;
        footer: Snippet;
        children: Snippet;
        onClose: () => void;
        class?: string;
    };
    let { header, footer, children, onClose, class: dialogClasses }: Props = $props();

    let classes = $derived(
        twMerge(
            'ui-border-border ui-flex ui-max-h-[80%] ui-min-h-fit ui-w-full ui-min-w-[480px] ui-max-w-lg ui-flex-col ui-overflow-hidden ui-rounded ui-border ui-bg-background ui-shadow-lg ui-transition-all',
            dialogClasses
        )
    );
</script>

<div
    role="presentation"
    class="ui-fixed ui-inset-0 ui-bg-black/50"
    transition:fade={{ duration: 150 }}
></div>
<div
    role="dialog"
    class="ui-fixed ui-inset-0 ui-z-50 ui-flex ui-items-center ui-justify-center"
    transition:fade={{ duration: 150 }}
>
    <div class={classes} aria-modal="true">
        <div class="ui-flex ui-w-full ui-items-center ui-justify-between ui-p-4">
            <h2 class="ui-text-xl ui-font-semibold">
                {@render header()}
            </h2>
            <IconButton color="muted" Icon={X} on:click={onClose} />
        </div>
        <div class="ui-relative ui-flex ui-flex-1 ui-flex-col ui-gap-4 ui-overflow-y-auto ui-px-4">
            {@render children()}
        </div>
        <div class="ui-p-4">
            {@render footer()}
        </div>
    </div>
</div>
