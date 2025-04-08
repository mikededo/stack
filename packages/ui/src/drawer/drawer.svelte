<script lang="ts">
    import type { Icon as LucideIcon } from 'lucide-svelte';
    import type { ComponentType, Snippet } from 'svelte';
    import type { Action } from 'svelte/action';

    import { portal, useActions } from '@stack/actions';

    import { LayoutTemplate, X } from 'lucide-svelte';
    import { spring } from 'svelte/motion';

    import { browser } from '$app/environment';

    import { IconButton } from '../icon-button/index.js';

    const DRAWER_WIDTH = 480;
    const MAX_DRAWER_POSITION = 488;
    const MIN_DRAWER_POSITION = 0;
    const MIN_OVERLAY_OPACITY = 0;
    const MAX_OVERLAY_OPACITY = 1;

    type Props = {
        children: Snippet;
        header: string;
        subtitle?: Snippet;
        Icon?: ComponentType<LucideIcon>;
        onClose?: () => void;
        show?: boolean;
    };
    const { children, header, Icon, onClose, show, subtitle }: Props = $props();

    const internalShow = spring(show ? MAX_OVERLAY_OPACITY : MIN_OVERLAY_OPACITY);
    const position = spring(show ? MAX_DRAWER_POSITION : MIN_DRAWER_POSITION);

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

        const scale = ((value - 0) * (2 - 0)) / (DRAWER_WIDTH - 0) + 0;
        contentElement.style.transform = `scale(${1 - scale / 100})`;
    });

    const onInternalClose = () => {
        position.set(MIN_DRAWER_POSITION);
        onClose?.();
    };

    const useOnClick: Action = (node) => {
        const onClick = (event: MouseEvent) => {
            if (!node.contains(event.target as HTMLElement)) {
                return;
            }

            onClose?.();
        };

        node.addEventListener('click', onClick);
    };

    $effect(() => {
        if (show) {
            internalShow.set(MAX_OVERLAY_OPACITY);
            position.set(MAX_DRAWER_POSITION);
        } else {
            setTimeout(() => {
                internalShow.set(MIN_OVERLAY_OPACITY);
            }, 150);
            position.set(MIN_DRAWER_POSITION);
        }
    });
</script>

{#if $internalShow}
    <div
        class="fixed inset-0 bg-black/30"
        use:useActions={[[portal, ''], useOnClick]}
        style="opacity: {$internalShow}"
    ></div>
{/if}
<div
    class="fixed bottom-2 top-2 z-10 flex overflow-x-hidden"
    use:portal={''}
    role="dialog"
    style="right: {-DRAWER_WIDTH + $position}px"
>
    <div
        class="flex h-full w-[480px] flex-col items-center gap-6 rounded-lg bg-white px-5 py-4"
    >
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
