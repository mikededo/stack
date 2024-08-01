<script lang="ts">
    import { clickAway, useActions } from '@mstack/actions';
    import type { ActionArray } from '@mstack/actions';

    import type { Snippet } from 'svelte';
    import { cubicInOut } from 'svelte/easing';
    import type { HTMLAttributes } from 'svelte/elements';
    import { fade } from 'svelte/transition';

    type Props = HTMLAttributes<HTMLDivElement> & {
        children: Snippet;
        onClickAway?: Parameters<typeof clickAway>[1];
        use?: ActionArray;
    };
    let { children, onClickAway, use = [], ...restProps }: Props = $props();
</script>

<div
    {...restProps}
    class="ui-absolute -ui-bottom-2 ui-right-0 ui-z-10 ui-flex ui-w-full ui-min-w-48 ui-origin-top-right ui-translate-y-full ui-flex-col ui-items-start ui-gap-[1px] ui-rounded-lg ui-border ui-border-secondary-100 ui-bg-white ui-p-1 ui-shadow-lg"
    transition:fade={{ duration: 150, easing: cubicInOut }}
    use:useActions={use}
>
    {@render children()}
</div>
