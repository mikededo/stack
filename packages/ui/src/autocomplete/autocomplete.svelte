<script lang="ts">
    import type { ActionArray } from '@stack/actions';
    import type { Snippet } from 'svelte';
    import type { Action } from 'svelte/action';

    import { clickAway, portal, useActions } from '@stack/actions';
    import { getFocusableElements, Keys } from '@stack/utils';
    import { twMerge } from 'tailwind-merge';

    import { FloatingCard } from '../floating-card/index.js';

    type Props = {
        children: Snippet;
        options: Snippet;
        cardClasses?: string;
        cardRef?: HTMLDivElement;
        class?: string;
        use?: ActionArray;
        onClickAway?: () => void;
        show?: boolean;
    };
    let {
        cardClasses,
        cardRef = $bindable(),
        children,
        options,
        show: showAutocomplete,
        use = [],
        ...restProps
    }: Props = $props();

    let wrapperNode = $state<HTMLDivElement | null>(null);
    let optionsWrapperNode = $state<HTMLDivElement | null>(null);
    const show = $derived(showAutocomplete ?? false);
    const autocompletePosition = $derived.by(() => {
        if (!wrapperNode) {
            return undefined;
        }

        const client = wrapperNode.getBoundingClientRect();
        return { left: client.left, top: client.top + client.height + 8, width: client.width + 8 };
    });

    $effect(() => {
        if (wrapperNode && document.activeElement !== wrapperNode) {
            wrapperNode.focus();
        }
    });

    const useAutocomplete: Action = (node) => {
        node.addEventListener('keydown', (event) => {
            if (!optionsWrapperNode) {
                return;
            }

            const focusableElements = getFocusableElements(optionsWrapperNode);
            if (!focusableElements.length) {
                return;
            }

            if (event.key === Keys.ArrowDown) {
                focusableElements[0].focus();
                event.preventDefault();
            } else if (event.key === Keys.ArrowUp) {
                focusableElements[focusableElements.length - 1].focus();
                event.preventDefault();
            }
        });
    };

    const onClickAway = () => {
        // Since the autocomplete does not provide an input, the show state is
        // always delegated to whoever renders the autocomplete
        restProps.onClickAway?.();
    };

    const onAutocompleteOptionCheck = (event: MouseEvent) => {
        return !cardRef || (!cardRef.contains(event.target as HTMLElement) && !event.defaultPrevented);
    };

    const autocompleteActions: ActionArray = [
        ...use,
        [clickAway, [onClickAway, { shouldClickAway: onAutocompleteOptionCheck }]],
        useAutocomplete
    ];
</script>

<div class={restProps.class} bind:this={wrapperNode} use:useActions={autocompleteActions}>
    {@render children()}
</div>

{#if show}
    <FloatingCard
        class={twMerge('!ui-z-50 !ui-mx-auto ui-overflow-hidden !ui-p-0', cardClasses)}
        bind:ref={cardRef}
        position={autocompletePosition}
        use={[[portal, '']]}
    >
        <div
            class="ui-flex ui-max-h-44 ui-w-full ui-flex-col ui-gap-[1px] ui-overflow-y-auto ui-overflow-x-hidden ui-p-1"
            bind:this={optionsWrapperNode}
        >
            {@render options()}
        </div>
    </FloatingCard>
{/if}
