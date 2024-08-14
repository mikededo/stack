<script lang="ts">
    import type { ActionArray } from '@mstack/actions';

    import type { Snippet } from 'svelte';
    import type { Action } from 'svelte/action';

    import { clickAway, portal, useActions } from '@mstack/actions';
    import { Keys } from '@mstack/utils';

    import { fade } from 'svelte/transition';

    import { FloatingCard } from '../floating-card/index.js';

    type Props = {
        children: Snippet;
        onClickAway?: () => void;
        options: Snippet;
        show?: boolean;
        use?: ActionArray;
    };
    let { children, onClickAway, options, show: showAutocomplete, use = [] }: Props = $props();

    let show = $derived(showAutocomplete ?? false);
    let wrapperNode = $state<HTMLDivElement | null>(null);
    let optionsWrapperNode = $state<HTMLDivElement | null>(null);
    let autocompletePosition = $derived.by(() => {
        if (!wrapperNode) {
            return undefined;
        }

        let client = wrapperNode.getBoundingClientRect();
        return {
            left: client.x,
            top: client.y + client.height + 4, // 8 as padding
            width: client.width
        };
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

            const children = optionsWrapperNode.children;
            if (event.key === Keys.ArrowDown) {
                (children[0] as HTMLElement).focus();
            } else if (event.key === Keys.ArrowUp) {
                (children[children.length - 1] as HTMLElement).focus();
            }
        });
    };

    const handleOnClickAway = () => {
        console.log('onClickAway');
        // Since the autocomplete does not provide an input, the show state is
        // always delegated to whoever renders the autocomplete
        onClickAway?.();
    };

    let autocompleteActions = $derived<ActionArray>([
        ...use,
        [clickAway, handleOnClickAway],
        useAutocomplete
    ]);
</script>

<div bind:this={wrapperNode} use:useActions={autocompleteActions}>
    {@render children()}
</div>

{#if show && options.length}
    <FloatingCard
        class="ui-rounded-0 ui-overflow-hidden ui-p-0"
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
