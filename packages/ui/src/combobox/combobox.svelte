<script lang="ts">
    import type { Action } from 'svelte/action';

    import { portal, useTrapFocus } from '@stack/actions';
    import { getFocusableElements, Keys } from '@stack/utils';

    import type { FloatingCardPosition } from '../floating-card/index.js';
    import type { Props } from './types.js';

    import { twMerge } from 'tailwind-merge';

    import { FloatingCard } from '../floating-card/index.js';
    import { Input } from '../input/index.js';

    let {
        input,
        inputProps,
        inputRef = $bindable(),
        onArrowDownPress,
        onArrowUpPress,
        onBackspacePress,
        options,
        selectedOptions,
        show,
        value = $bindable('')
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
</script>

<div class="ui-flex ui-w-full ui-flex-wrap ui-items-center ui-gap-1" bind:this={containerRef}>
    <!-- Render items as chip or custom element -->
    {@render selectedOptions()}
    {#if input}
        {@render input({ ref: inputRef, use: [useInput], value })}
    {:else}
        <Input
            {...inputProps}
            class={twMerge('ui-w-full', inputProps?.class)}
            bind:ref={inputRef}
            bind:value
            use={[useInput]}
        />
    {/if}
</div>

{#if showOptions && show}
    <!-- Max height set to 156 as each menu option is 36 + y padding + gap -->
    <FloatingCard
        class="ui-max-h-[156px] ui-overflow-y-auto"
        bind:ref={popupRef}
        role="menu"
        tabindex={1}
        use={[[portal, ''], useTrapFocus]}
        {position}
    >
        {@render options()}
    </FloatingCard>
{/if}
