<script lang="ts">
    import type { HTMLTextareaAttributes } from 'svelte/elements';

    import { twMerge } from 'tailwind-merge';

    type Props = {
        ref?: HTMLTextAreaElement;
        title?: string;
    } & HTMLTextareaAttributes;

    let { ref = $bindable(), title, ...restProps }: Props = $props();
    const classes = $derived(
        twMerge(
            'resize-none rounded-md border px-3 py-2 font-mono text-sm outline-hidden ring-2 ring-transparent ring-offset-1 transition-colors duration-150 hover:border-primary hover:ring-primary-100 hover:ring-offset-primary-100 focus:border-primary focus:ring-primary-100 focus:ring-offset-primary-100 md:px-3',
            restProps.class
        )
    );
</script>

<p class="m-0 font-semibold">{title}</p>
<textarea
    {...restProps}
    bind:this={ref}
    class={classes}
></textarea>
