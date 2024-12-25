
<script lang="ts">
    import type { Position, Toast } from './state.svelte.js';

    import { onMount, tick } from 'svelte';

    import {
        GAP,
        SCALE_MULTIPLIER,
        SWIPE_TRESHOLD,
        TIME_BEFORE_UNMOUNT,
        TOAST_LIFETIME
    } from './constants.js';
    import { toastState } from './state.svelte';
    import ToastIcon from './toast-icon.svelte';

    type Props = {
        expandByDefault: boolean;
        expanded: boolean;
        index: number;
        interacting: boolean;
        closeButton: boolean;
        duration: number;
        position: Position;
        toast: Toast;
        visibleToasts: number;
    };

    const {
        closeButton,
        duration,
        expandByDefault,
        expanded,
        index,
        interacting,
        position,
        toast,
        visibleToasts
    }: Props = $props();

    const {
        heights,
        remove,
        removeHeight,
        setHeight,
        toasts
    } = $derived(toastState);

    let mounted = $state(false);
    let removed = $state(false);
    let swiping = $state(false);
    let swipeOut = $state(false);
    let offsetBeforeRemove = $state(0);
    let initialHeight = $state(0);
    let toastRef: HTMLLIElement | null = $state(null);

    const isFront = $derived(index === 0);
    const isVisible = $derived(index + 1 <= visibleToasts);
    const toastTitle = $derived(toast.title);
    const toastDescription = $derived(toast.description);
    const toastType = $derived(toast.type);

    // Height index is used to calculate the offset as it gets updated before
    // the toast array, which means we can calculate the new layout faster.
    const heightIndex = $derived(heights.findIndex((height) => height.toastId === toast.id) || 0);

    let closeTimerStartTimeRef = 0;
    let lastCloseTimerStartTimeRef = 0;
    let pointerStartRef: { x: number; y: number } | null = null;

    const coords = $derived(position.split('-'));
    const toastsHeightBefore = $derived(heights.reduce((prev, curr, reducerIndex) => {
        // Calculate offset up untill current  toast
        if (reducerIndex >= heightIndex) {
            return prev;
        }

        return prev + curr.height;
    }, 0));

    // Sometimes toasts are blurry when offset isn't an int
    const offset = $derived(Math.round(heightIndex * GAP + toastsHeightBefore));

    // Listen to height changes
    const updateHeights = async () => {
        if (!mounted || !toastRef) {
            return;
        }

        await tick();

        let scale: number;
        if (expanded || expandByDefault) {
            scale = 1;
        } else {
            scale = 1 - index * SCALE_MULTIPLIER;
        }

        toastRef.style.setProperty('height', 'auto');

        const offsetHeight = toastRef.offsetHeight;
        // rectHeight is affected by transform: scale(...);
        const rectHeight = toastRef.getBoundingClientRect().height;
        const scaledRectHeight =
            Math.round((rectHeight / scale + Number.EPSILON) * 100) / 100;

        toastRef.style.removeProperty('height');

        let finalHeight: number;
        if (Math.abs(scaledRectHeight - offsetHeight) < 1) {
            // Use scaledRectHeight as it's more precise
            finalHeight = scaledRectHeight;
        } else {
            // toast was transitioning its scale, so scaledRectHeight isn't accurate
            finalHeight = offsetHeight;
        }

        initialHeight = finalHeight;

        setHeight({ height: finalHeight, toastId: toast.id });
    };

    $effect(() => {
        // eslint-disable-next-line no-unused-expressions
        toastTitle;
        // eslint-disable-next-line no-unused-expressions
        toastDescription;

        updateHeights();
    });

    const deleteToast = () => {
        removed = true;
        // Save the offset for the exit swipe animation
        offsetBeforeRemove = offset;

        removeHeight(toast.id);

        setTimeout(() => {
            remove(toast.id);
        }, TIME_BEFORE_UNMOUNT);
    };

    /* Timer management */

    let timeoutId: ReturnType<typeof setTimeout>;
    let remainingTime = toast.duration || duration || TOAST_LIFETIME;

    const pauseTimer = () => {
        if (lastCloseTimerStartTimeRef < closeTimerStartTimeRef) {
            // Get the elapsed time since the timer started
            const elapsedTime = new Date().getTime() - closeTimerStartTimeRef;
            remainingTime = remainingTime - elapsedTime;
        }

        lastCloseTimerStartTimeRef = new Date().getTime();
    };

    const startTimer = () => {
        closeTimerStartTimeRef = new Date().getTime();
        // Let the toast know it has started
        timeoutId = setTimeout(() => {
            toast.onAutoClose?.(toast);
            deleteToast();
        }, remainingTime);
    };

    $effect(() => {
        if (expanded || interacting) {
            pauseTimer();
        } else {
            startTimer();
        }

        return () => {
            clearTimeout(timeoutId);
        };
    });

    onMount(() => {
        if (!toastRef) {
            return;
        }

        mounted = true;

        const height = toastRef.getBoundingClientRect().height;

        // Add toast height tot heights array after the toast is mounted
        initialHeight = height;
        setHeight({ height, toastId: toast.id });

        return () => {
            removeHeight(toast.id);
        };
    });

    $effect(() => {
        if (toast.delete) {
            deleteToast();
        }
    });

    // Event listeners

    const onPointerDown = (event: PointerEvent) => {
        offsetBeforeRemove = offset;
        const target = event.target as HTMLElement;

        // Ensure we maintain correct pointer capture even when going outside of the toast (e.g. when swiping)
        target.setPointerCapture(event.pointerId);
        if (target.tagName === 'BUTTON') {
            return;
        }

        swiping = true;
        pointerStartRef = { x: event.clientX, y: event.clientY };
    };

    const onPointerUp = () => {
        if (swipeOut || !toastRef) {
            return;
        }

        pointerStartRef = null;
        const swipeAmount = Number(
            toastRef?.style
                .getPropertyValue('--swipe-amount')
                .replace('px', '') || 0
        );

        // Remove only if treshold is met
        if (Math.abs(swipeAmount) >= SWIPE_TRESHOLD) {
            offsetBeforeRemove = offset;
            toast.onDismiss?.(toast);
            deleteToast();
            swipeOut = true;
            return;
        }

        toastRef.style.setProperty('--swipe-amount', '0px');
        swiping = false;
    };

    const onPointerMove = (event: PointerEvent) => {
        if (!pointerStartRef || !toastRef) {
            return;
        }

        const yPosition = event.clientY - pointerStartRef!.y;
        const xPosition = event.clientX - pointerStartRef!.x;

        const clamp = coords[0] === 'top' ? Math.min : Math.max;
        const clampedY = clamp(0, yPosition);
        const swipeStartThreshold = event.pointerType === 'touch' ? 10 : 2;
        const isAllowedToSwipe = Math.abs(clampedY) > swipeStartThreshold;

        if (isAllowedToSwipe) {
            toastRef.style.setProperty('--swipe-amount', `${yPosition}px`);
        } else if (Math.abs(xPosition) > swipeStartThreshold) {
            // User is swiping in wrong direction so we disable swipe gesture
            // for the current pointer down interaction
            pointerStartRef = null;
        }
    };

    const onCloseButtonClick = () => {
        deleteToast();
        toast.onDismiss?.(toast);
    };

    const onToastCancelClick = () => {
        deleteToast();
        toast.cancel?.onClick?.();
    };

    const onToastActionClick = (event: MouseEvent) => {
        toast.action?.onClick(event);
        if (event.defaultPrevented) {
            return;
        }
        deleteToast();
    };
</script>

<li
    bind:this={toastRef}
    aria-live={toast.important ? 'assertive' : 'polite'}
    aria-atomic="true"
    role="status"
    tabIndex={0}
    data-sonner-toast=""
    data-mounted={mounted}
    data-removed={removed}
    data-visible={isVisible}
    data-y-position={coords[0]}
    data-x-position={coords[1]}
    data-index={index}
    data-front={isFront}
    data-swiping={swiping}
    data-type={toastType}
    data-swipe-out={swipeOut}
    data-expanded={Boolean(expanded || (expandByDefault && mounted))}
    style:--index={index}
    style:--toasts-before={index}
    style:--z-index={toasts.length - index}
    style:--offset={`${removed ? offsetBeforeRemove : offset}px`}
    style:--initial-height={`${initialHeight}px`}
    onpointerdown={onPointerDown}
    onpointerup={onPointerUp}
    onpointermove={onPointerMove}
>
    {#if closeButton}
        <button
            aria-label="Close toast"
            data-close-button
            onclick={onCloseButtonClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <line
                    x1="18"
                    y1="6"
                    x2="6"
                    y2="18"
                />
                <line
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                />
            </svg>
        </button>
    {/if}

    {#if toastType !== 'default'}
        <div data-icon="">
            {#if toastType === 'success'}
                <ToastIcon type="success" />
            {:else if toastType === 'error'}
                <ToastIcon type="success" />
            {:else if toastType === 'warning'}
                <ToastIcon type="success" />
            {:else if toastType === 'info'}
                <ToastIcon type="success" />
            {/if}
        </div>
    {/if}

    <div data-content="">
        {#if toast.title}
            <div data-title="">
                {toast.title}
            </div>
        {/if}
        {#if toast.description}
            <div data-description="">
                {toast.description}
            </div>
        {/if}
    </div>

    {#if toast.cancel}
        <button
            data-button
            data-cancel
            onclick={onToastCancelClick}
        >
            {toast.cancel.label}
        </button>
    {/if}

    {#if toast.action}
        <button data-button="" onclick={onToastActionClick}>
            {toast.action.label}
        </button>
    {/if}
</li>
