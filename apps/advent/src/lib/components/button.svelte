<script lang="ts">
    import type { HTMLButtonAttributes } from 'svelte/elements';

    import { twMerge } from 'tailwind-merge';

    type Props = HTMLButtonAttributes;
    const { ...rest }: Props = $props();
</script>

<button
    {...rest}
    class={twMerge('rounded-full bg-gray-700 px-4 py-2 text-sm font-semibold uppercase text-white transition-all hover:bg-gray-600 active:scale-[0.975] disabled:cursor-not-allowed disabled:bg-gray-500', rest.class)}
>
    {@render rest.children?.()}
</button>
