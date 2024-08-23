<script lang="ts">
    import type { Icon as LucideIcon } from 'lucide-svelte';
    import type { ComponentType, Snippet } from 'svelte';
    import type { Action } from 'svelte/action';

    import { portal, useActions } from '@stack/actions';

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
        class="ui-fixed ui-inset-0 ui-bg-black/30"
        use:useActions={[[portal, ''], useOnClick]}
        style="opacity: {$position / 480}"
    ></div>
{/if}
<div
    class="ui-fixed ui-bottom-2 ui-top-2 ui-z-10 ui-flex ui-overflow-x-hidden"
    use:portal={''}
    role="dialog"
    style="right: {-480 + $position}px"
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
