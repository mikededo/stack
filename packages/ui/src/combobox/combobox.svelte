<script lang="ts">
    import type { Action } from 'svelte/action';

    import { portal, useTrapFocus } from '@stack/actions';
    import { getFocusableElements, Keys } from '@stack/utils';

    import type { FloatingCardPosition } from '../floating-card/index.js';
    import type { Props } from './types.js';

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
        node.addEventListener('blur', (e) => {
            // If clicks away from the combobox, hide the options
            if (e.relatedTarget instanceof HTMLElement && popupRef?.contains(e.relatedTarget)) {
                // Do not blur
                node.focus();
                return;
            }

            showOptions = false;
        });

        if (autofocus) {
            node.focus();
        }
    };

    const useContainer: Action<HTMLDivElement> = (node) => {
        // Attach action only if the input is not custom
        if (input) {
            return;
        }

        node.addEventListener('mousedown', (e) => {
            if (e.target === node && document.activeElement !== inputRef) {
                inputRef?.focus();
                e.preventDefault();
            }
        });
    };

    // Mimic the input classes
    const containerClasses = $derived(
        twMerge(
            'ui-min-h-10 ui-rounded ui-border ui-px-4 ui-py-2 ui-transition-all aria-disabled:ui-cursor-not-allowed aria-disabled:ui-border-border aria-disabled:ui-bg-surface-50 focus-within:ui-border-primary input',
            !inputProps?.disabled && 'hover:ui-border-primary',
            inputProps?.invalid && 'hover:ui-border-desctructive ui-border-destructive focus:ui-border-destructive active:ui-border-destructive',
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
    use:useContainer
    aria-disabled={inputProps?.disabled}
>
    <!-- Render items as chip or custom element -->
    {@render selectedOptions()}
    {#if input}
        {@render input({ ref: inputRef, use: [useInput] })}
    {:else if inputProps}
        <input
            {...inputProps}
            class="ui-outline-none ui-w-full ui-flex-1 ui-min-w-12 disabled:ui-bg-surface-50 disabled:ui-cursor-not-allowed"
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
        use={[[portal, ''], useTrapFocus]}
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
