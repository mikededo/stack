<script lang="ts">
    import './styles.postcss';

    import type { HTMLOlAttributes } from 'svelte/elements';

    import type { Position, ToastOptions, ToastToDismiss } from './state.svelte.js';

    import { onDestroy, onMount } from 'svelte';

    import {
        DARK,
        GAP,
        LIGHT,
        TOAST_WIDTH,
        VIEWPORT_OFFSET,
        VISIBLE_TOASTS_AMOUNT
    } from './constants.js';
    import { toastState } from './state.svelte.js';
    import Toast from './toast.svelte';

    type Props = HTMLOlAttributes &
        Partial<{
            expand: boolean;
            gap: number;
            theme: 'dark' | 'light' | 'system';
            closeButton: boolean;
            duration: number;
            offset: null | number | string;
            position: Position;
            toastOptions: ToastOptions;
            visibleToasts: number;
            containerAriaLabel?: string;
        }>;

    type OListFocusEvent = {
        currentTarget: EventTarget & HTMLOListElement;
    } & FocusEvent;

    const getInitialTheme = (t: string) => {
        if (t !== 'system') {
            return t;
        }

        if (typeof window !== 'undefined') {
            if (
                window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches
            ) {
                return DARK;
            }

            return LIGHT;
        }

        return LIGHT;
    };

    const {
        closeButton = false,
        containerAriaLabel = 'Notifications',
        duration = 4000,
        expand = false,
        offset = null,
        position = 'bottom-right',
        theme = 'light',
        toastOptions = {},
        visibleToasts = VISIBLE_TOASTS_AMOUNT,
        ...restProps
    }: Props = $props();

    const { heights, reset, toasts } = $derived(toastState);

    const possiblePositions = $derived(Array.from(
        new Set(
            [
                position,
                ...toasts
                    .filter((toast) => toast.position)
                    .map((toast) => toast.position)
            ].filter(Boolean)
        )
    ) as Position[]);

    let expanded = $state(false);
    let interacting = $state(false);
    let actualTheme = $state(getInitialTheme(theme));
    let listRef: HTMLOListElement | null = $state(null);
    let lastFocusedElementRef: HTMLElement | null = $state(null);
    let isFocusWithinRef = $state(false);

    $effect(() => {
        if (toasts.length <= 1) {
            expanded = false;
        }
    });

    // Check for dismissed toasts and remove them. We need to do this to have dismiss animation.
    $effect(() => {
        const toastsToDismiss = toasts.filter(
            (toast) => (toast as unknown as ToastToDismiss).dismiss && !toast.delete
        );

        if (toastsToDismiss.length === 0) {
            return;
        }

        const updatedToasts = toasts.map((toast) => {
            const matchingToast = toastsToDismiss.find(
                (dismissToast) => dismissToast.id === toast.id
            );

            if (matchingToast) {
                return { ...toast, delete: true };
            }

            return toast;
        });

        toastState.toasts = updatedToasts;
    });

    onDestroy(() => {
        if (listRef && lastFocusedElementRef) {
            lastFocusedElementRef.focus({ preventScroll: true });
            lastFocusedElementRef = null;
            isFocusWithinRef = false;
        }
    });

    onMount(() => {
        reset();

        const handleKeydown = (event: KeyboardEvent) => {
            if (event.code === 'Escape' && (document.activeElement === listRef || listRef?.contains(document.activeElement))) {
                expanded = false;
            }
        };

        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    });

    $effect(() => {
        if (theme !== 'system') {
            actualTheme = theme;
        }

        if (typeof window !== 'undefined') {
            if (theme === 'system') {
                // check if current preference is dark
                if (
                    window.matchMedia &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches
                ) {
                    // it's currently dark
                    actualTheme = DARK;
                } else {
                    // it's not dark
                    actualTheme = LIGHT;
                }
            }

            const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
            const changeHandler = ({ matches }: MediaQueryListEvent) => {
                actualTheme = matches ? DARK : LIGHT;
            };

            if ('addEventListener' in mediaQueryList) {
                mediaQueryList.addEventListener('change', changeHandler);
            } else {
                // @ts-expect-error deprecated API
                mediaQueryList.addListener(changeHandler);
            }
        }
    });

    const onBlur = (event: OListFocusEvent) => {
        if (
            isFocusWithinRef &&
            !event.currentTarget.contains(event.relatedTarget as HTMLElement)
        ) {
            isFocusWithinRef = false;

            if (lastFocusedElementRef) {
                lastFocusedElementRef.focus({ preventScroll: true });
                lastFocusedElementRef = null;
            }
        }
    };

    const onFocus = (event: OListFocusEvent) => {
        if (!isFocusWithinRef) {
            isFocusWithinRef = true;
            lastFocusedElementRef = event.relatedTarget as HTMLElement;
        }
    };

    const onMouseEnter = () => {
        expanded = true;
    };

    const onMouseMove = () => {
        expanded = true;
    };

    const onMouseLeave = () => {
        if (!interacting) {
            expanded = false;
        }
    };

    const onPointerDown = () => {
        interacting = true;
    };

    const onPointerUp = () => {
        interacting = false;
    };
</script>

{#if toasts.length > 0}
    <section class="not-prose" aria-label={containerAriaLabel} tabIndex={-1}>
        {#each possiblePositions as position, index}
            <ol
                tabIndex={-1}
                bind:this={listRef}
                data-sonner-toaster
                data-theme={actualTheme}
                data-y-position={position.split('-')[0]}
                data-x-position={position.split('-')[1]}
                onblur={onBlur}
                onfocus={onFocus}
                onmouseenter={onMouseEnter}
                onmousemove={onMouseMove}
                onmouseleave={onMouseLeave}
                onpointerdown={onPointerDown}
                onpointerup={onPointerUp}
                style:--front-toast-height={`${heights[0]?.height}px`}
                style:--offset={typeof offset === 'number'
                    ? `${offset}px`
                    : offset || VIEWPORT_OFFSET}
                style:--width={`${TOAST_WIDTH}px`}
                style:--gap={`${GAP}px`}
                {...restProps}
            >
                {#each toasts.filter((toast) => (!toast.position && index === 0) || toast.position === position) as toast, index (toast.id)}
                    <Toast
                        {index}
                        {toast}
                        {visibleToasts}
                        {closeButton}
                        {interacting}
                        {position}
                        expandByDefault={expand}
                        {expanded}
                        duration={toastOptions?.duration ?? duration}
                    />
                {/each}
            </ol>
        {/each}
    </section>
{/if}
