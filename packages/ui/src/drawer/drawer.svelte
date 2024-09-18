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
        Icon?: ComponentType<LucideIcon>;
        show?: boolean;
        subtitle?: Snippet;
        onClose?: () => void;
    };
    let { children, header, Icon, onClose, show, subtitle }: Props = $props();

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

        return {
            destroy() {
                node.removeEventListener('click', onClick);
            }
        };
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
        class="ui-fixed ui-inset-0 ui-bg-black/30"
        use:useActions={[[portal, ''], useOnClick]}
        style="opacity: {$internalShow}"
    ></div>
{/if}
<div
    class="ui-fixed ui-bottom-2 ui-top-2 ui-z-10 ui-flex ui-overflow-x-hidden"
    use:portal={''}
    role="dialog"
    style="right: {-DRAWER_WIDTH + $position}px"
>
    <div
        class="ui-flex ui-h-full ui-w-[480px] ui-flex-col ui-items-center ui-gap-6 ui-rounded-lg ui-bg-white ui-px-5 ui-py-4"
    >
        <div class="ui-flex ui-flex-col ui-gap-4">
            <div class="ui-flex ui-w-full ui-items-center ui-justify-between">
                <div class="ui-flex ui-items-center ui-gap-2">
                    {#if Icon}<LayoutTemplate class="ui-size-5" strokeWidth={2.5} />{/if}
                    <h2 class="ui-text-2xl">{header}</h2>
                </div>
                <IconButton color="muted" Icon={X} onclick={onInternalClose} />
            </div>
            {#if subtitle}
                <p class="ui-text-sm ui-text-surface-700">
                    {@render subtitle()}
                </p>
            {/if}
        </div>
        {@render children()}
    </div>
</div>
