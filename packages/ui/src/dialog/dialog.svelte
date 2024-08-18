<script lang="ts">
    import type { Snippet } from 'svelte';

    import { useBlockScroll } from '@stack/actions';

    import { X } from 'lucide-svelte';
    import { fade } from 'svelte/transition';
    import { twMerge } from 'tailwind-merge';

    import { IconButton } from '../icon-button/index.js';

    type Props = {
        children: Snippet;
        class?: string;
        footer?: Snippet;
        header?: Snippet;
        onClose: () => void;
    };
    let { children, class: dialogClasses, footer, header, onClose }: Props = $props();

    let classes = $derived(
        twMerge(
            'ui-border-border ui-flex ui-max-h-[80%] ui-min-h-fit ui-w-full ui-min-w-[480px] ui-max-w-lg ui-flex-col ui-overflow-hidden ui-rounded ui-border ui-bg-background ui-shadow-lg ui-transition-all',
            dialogClasses
        )
    );
</script>

<div
    class="ui-fixed ui-inset-0 ui-bg-black/50"
    role="presentation"
    transition:fade={{ duration: 150 }}
></div>
<div
    class="ui-fixed ui-inset-0 ui-z-50 ui-flex ui-items-center ui-justify-center"
    use:useBlockScroll
    role="dialog"
    transition:fade={{ duration: 150 }}
>
    <div class={classes} aria-modal="true">
        {#if header}
            <div class="ui-flex ui-w-full ui-items-center ui-justify-between ui-p-5">
                <h2 class="ui-text-xl ui-font-semibold">
                    {@render header()}
                </h2>
                <IconButton color="muted" Icon={X} onclick={onClose} />
            </div>
        {/if}
        <div class="ui-relative ui-flex ui-flex-1 ui-flex-col ui-gap-4 ui-overflow-y-auto ui-px-5">
            {@render children()}
        </div>
        {#if footer}
            <div class="ui-p-5">
                {@render footer()}
            </div>
        {/if}
    </div>
</div>
