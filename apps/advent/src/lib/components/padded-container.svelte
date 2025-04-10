<script lang="ts">
    import type { Snippet } from 'svelte';

    import { twMerge } from 'tailwind-merge';

    type Props = {
        children: Snippet;
        class?: string;
    };
    const { children, ...props }: Props = $props();
</script>

<script lang="ts" module>
    export const paddedContainerClasses = (merge: string = '') => twMerge(
        'container px-6 py-8 lg:py-12 lg:pb-28 lg:pt-16',
        merge
    );
</script>

<div class={paddedContainerClasses(props.class)}>
    {@render children()}
</div>

