<script lang="ts">
    import type { Action } from 'svelte/action';

    import { portal, useTrapFocus } from '@stack/actions';
    import { FloatingCard, type FloatingCardPosition } from '@stack/ui';
    import { getFocusableElements, Keys } from '@stack/utils';

    import type { Props } from './types.js';

    let {
        inputRef = $bindable(),
        onArrowDownPress,
        onArrowUpPress,
        onBackspacePress,
        options,
        selectedOptions,
        show,
        value = $bindable()
    }: Props = $props();

    let position = $state<FloatingCardPosition | undefined>();
    let containerRef = $state<HTMLDivElement>();
    let popupRef = $state<HTMLDivElement>();
    let showOptions = $state(false);

    const useInput: Action = (node) => {
        const onKeydown = (event: KeyboardEvent) => {
            // Keystrokes that are not related with the pop up
            if (event.key === Keys.Backspace) {
                onBackspacePress?.();
            }

            if (!popupRef) {
                return;
            }

            const focusableElements = getFocusableElements(popupRef);
            if (!focusableElements.length) {
                return;
            }
            // Keystrokes that are related with the pop up
            if (event.key === Keys.ArrowDown) {
                focusableElements[0].focus();
                event.preventDefault();
                onArrowDownPress?.();
            } else if (event.key === Keys.ArrowUp) {
                focusableElements[focusableElements.length - 1].focus();
                event.preventDefault();
                onArrowUpPress?.();
            }
        };

        const onFocus = () => {
            showOptions = true;
        };

        node.addEventListener('keydown', onKeydown);
        node.addEventListener('focus', onFocus);

        node.focus();
    };

    $effect(() => {
        // Force update on tags update
        // eslint-disable-next-line no-unused-expressions
        options;

        if (!containerRef) {
            return;
        }

        const client = containerRef.getBoundingClientRect();

        position = {
            left: client.x,
            top: client.y + client.height + 4,
            width: client.width
        };
    });

    $inspect(options);
</script>

<div class="ui-flex ui-flex-wrap ui-items-center ui-gap-1" bind:this={containerRef}>
    <!-- Render items as chip or custom element -->
    {@render selectedOptions()}
    <input
        class="w-full min-w-12 flex-1 outline-none group-hover:bg-primary-50 group-aria-current:bg-primary-50 hover:bg-primary-50"
        bind:this={inputRef}
        bind:value
        use:useInput
    />
</div>

{#if showOptions && show}
    <!-- Max height set to 156 as each menu option is 36 + y padding + gap -->
    <FloatingCard
        class="max-h-[156px] overflow-y-auto"
        bind:ref={popupRef}
        role="menu"
        tabindex={1}
        use={[[portal, ''], useTrapFocus]}
        {position}
    >
        {@render options()}
    </FloatingCard>
{/if}
