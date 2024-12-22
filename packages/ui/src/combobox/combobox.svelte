<script lang="ts">
    import type { Action } from 'svelte/action';

    import type { FloatingCardPosition } from '../floating-card/index.js';
    import type { Props } from './types.js';

    import { clickAway, portal, useActions, useTrapFocus } from '@stack/actions';
    import { getFocusableElements, Keys } from '@stack/utils';
    import { twMerge } from 'tailwind-merge';

    import { FloatingCard } from '../floating-card/index.js';

    let {
        autofocus = false,
        input,
        inputProps,
        inputRef = $bindable(),
        onArrowDownPress,
        onArrowUpPress,
        onBackspacePress,
        options,
        selectedOptions,
        show = true,
        value = $bindable('')
    }: Props = $props();

    let position = $state<FloatingCardPosition | undefined>();
    let containerRef = $state<HTMLDivElement>();
    let popupRef = $state<HTMLDivElement>();
    let showOptions = $state(autofocus);

    let isOptionFocused = false;

    const useInput: Action = (node) => {
        const onKeydown = (event: KeyboardEvent) => {
            // Keystrokes that are not related with the pop up
            if (event.key === Keys.Backspace && !value) {
                onBackspacePress?.();
            }

            if (!popupRef) {
                return;
            }

            const focusableElements = getFocusableElements(popupRef);
            if (!focusableElements.length) {
                return;
            }

            isOptionFocused = true;
            event.preventDefault();

            // Keystrokes that are related with the pop up
            if (event.key === Keys.ArrowDown) {
                focusableElements[0].focus();
                onArrowDownPress?.();
            } else if (event.key === Keys.ArrowUp) {
                focusableElements[focusableElements.length - 1].focus();
                onArrowUpPress?.();
            }
        };

        const onFocus = () => {
            isOptionFocused = false;
            showOptions = true;
        };

        const onBlur = (e: FocusEvent) => {
            if (isOptionFocused) {
                return;
            }

            if (e.relatedTarget instanceof HTMLElement && popupRef?.contains(e.relatedTarget)) {
                // Persist focus on the input
                inputRef?.focus();
                return;
            }

            // If clicks away from the combobox, hide the options
            showOptions = false;
        };

        node.addEventListener('keydown', onKeydown);
        node.addEventListener('focus', onFocus);
        node.addEventListener('blur', onBlur);

        if (autofocus) {
            node.focus();
        }
    };

    const useContainer: Action = (node) => {
        // Attach action only if the input is not custom
        if (input) {
            return;
        }

        const onMouseDown = (e: MouseEvent) => {
            if (e.target === node && document.activeElement !== inputRef) {
                inputRef?.focus();
                e.preventDefault();
            }
        };

        node.addEventListener('mousedown', onMouseDown);
    };

    const usePopup: Action = (node) => {
        const onKeydown = (e: KeyboardEvent) => {
            if (e.key === Keys.Escape) {
                inputRef?.focus();
            }
        };

        node.addEventListener('keydown', onKeydown);
    };

    // Mimic the input classes
    const containerClasses = $derived(
        twMerge(
            'ui-min-h-10 ui-rounded ui-border ui-px-3 ui-py-2 ui-transition-all aria-disabled:ui-cursor-not-allowed aria-disabled:ui-border-border aria-disabled:ui-bg-surface-50 focus-within:ui-border-primary input',
            !inputProps?.disabled && 'hover:ui-border-primary',
            inputProps?.invalid && 'hover:ui-border-desctructive ui-border-destructive focus:ui-border-destructive active:ui-border-destructive',
            inputProps?.class
        )
    );
    const inputClasses = $derived(
        twMerge(
            'ui-outline-none ui-w-full ui-flex-1 ui-min-w-12 disabled:ui-bg-surface-50 disabled:ui-cursor-not-allowed',
            inputProps?.class
        )
    );

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

{#if !input && inputProps?.label}
    <label class="ui-text-xs ui-font-semibold ui-uppercase" for={inputProps.name}>
        {inputProps.label}
    </label>
{/if}
<div
    class={twMerge('ui-flex ui-w-full ui-flex-wrap ui-items-center ui-gap-1', inputProps && containerClasses)}
    bind:this={containerRef}
    use:useActions={[useContainer, clickAway]}
    aria-disabled={inputProps?.disabled}
>
    <!-- Render items as chip or custom element -->
    {@render selectedOptions?.()}
    {#if input}
        {@render input({ ref: inputRef, use: [useInput] })}
    {:else if inputProps}
        <input
            {...inputProps}
            class={inputClasses}
            bind:this={inputRef}
            bind:value
            use:useInput
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
        use={[[portal, ''], useTrapFocus, usePopup]}
        {position}
    >
        {@render options()}
    </FloatingCard>
{/if}

<style lang="postcss">
    .input:focus-within {
        box-shadow: 0 0 0 4px theme('colors.primary.100');
    }

    .input[aria-invalid='true']:focus-within {
        box-shadow: inset 0 0 0 4px theme('colors.destructive.100');
    }
</style>
