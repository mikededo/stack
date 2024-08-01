<script lang="ts">
    import { clickAway } from '@mstack/actions';

    import type { Snippet } from 'svelte';
    import type { Action } from 'svelte/action';
    import { cubicInOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';

    type Props = {
        children: Snippet;
        onClickAway?: Parameters<typeof clickAway>[1];
    };
    let { children, onClickAway }: Props = $props();

    const internalClickAway: Action<HTMLDivElement> = (node) => {
        if (onClickAway) {
            // Since we are proyxing the action, we need to return the ActionResult so that the
            // destroy function is called
            return clickAway(node, onClickAway);
        }
    };
</script>

<div
    class="ui-absolute -ui-bottom-2 ui-right-0 ui-z-10 ui-flex ui-w-full ui-min-w-48 ui-origin-top-right ui-translate-y-full ui-flex-col ui-items-start ui-gap-[1px] ui-rounded-lg ui-border ui-border-secondary-100 ui-bg-white ui-p-1 ui-shadow-lg"
    transition:fade={{ duration: 150, easing: cubicInOut }}
    use:internalClickAway
>
    {@render children()}
</div>
