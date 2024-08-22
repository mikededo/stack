<script lang="ts">
    import type { Icon as LucideIcon } from 'lucide-svelte';
    import type { ComponentType, Snippet } from 'svelte';

    import { portal } from '@stack/actions';

    import { LayoutTemplate, X } from 'lucide-svelte';
    import { spring } from 'svelte/motion';

    import { browser } from '$app/environment';

    import { IconButton } from '../icon-button/index.js';

    type Props = {
        children: Snippet;
        header: string;
        Icon?: ComponentType<LucideIcon>;
        onClose?: () => void;
        show?: boolean;
        subtitle?: Snippet;
    };
    let { children, header, Icon, onClose, show, subtitle }: Props = $props();

    let internalShow = $state(show ?? false);
    const position = spring(0, { damping: 1, precision: 1, stiffness: 0.3 });

    let contentElement: HTMLElement | null = null;
    position.subscribe((value) => {
        if (!browser) {
            return;
        }

        // Try getting the element again
        contentElement = contentElement || document?.getElementById('content');
        if (!contentElement) {
            return;
        }

        const scale = ((value - 0) * (2 - 0)) / (480 - 0) + 0;
        contentElement.style.transform = `scale(${1 - scale / 100})`;
    });

    const onInternalClose = () => {
        position.set(0);
        onClose?.();
    };

    $effect(() => {
        if (show) {
            internalShow = true;
            position.set(488);
        } else {
            setTimeout(() => {
                internalShow = false;
            }, 250);
            position.set(0);
        }
    });
</script>

{#if internalShow}
    <div
        class="bg-black/30 ui-fixed ui-inset-0"
        use:portal={''}
        style="opacity: {$position / 480}"
    ></div>
{/if}
<div
    class="fixed bottom-2 top-2 z-10 flex overflow-x-hidden"
    use:portal={''}
    role="dialog"
    style="right: {-480 + $position}px"
>
    <div class="flex h-full w-[480px] flex-col items-center gap-6 rounded-lg bg-white px-5 py-4">
        <div class="flex flex-col gap-4">
            <div class="flex w-full items-center justify-between">
                <div class="flex items-center gap-2">
                    {#if Icon}<LayoutTemplate class="size-5" strokeWidth={2.5} />{/if}
                    <h2 class="text-2xl">{header}</h2>
                </div>
                <IconButton color="muted" Icon={X} onclick={onInternalClose} />
            </div>
            {#if subtitle}
                <p class="text-sm text-surface-700">
                    {@render subtitle()}
                </p>
            {/if}
        </div>
        {@render children()}
    </div>
</div>
