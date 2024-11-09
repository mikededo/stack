<script lang="ts">
    import { Chip } from '@stack/ui';

    import { Check, CircleX, TriangleAlert } from 'lucide-svelte';
    import { twMerge } from 'tailwind-merge';

    type Props = {
        /**
         * The number of translated values a key has
         */
        count: number;
        /**
         * The maximum number of translations a key can have. Should be the
         * same number as the languages of a project
         */
        max: number;
        class?: string;
        condensed?: boolean;
    };
    const { condensed, count, max, ...rest }: Props = $props();

    const [status, Icon, text] = $derived.by(() => {
        if (count < 1) {
            return ['destructive' as const, CircleX, 'Not started'];
        }

        return count < max
            ? ['warning' as const, TriangleAlert, 'Incomplete']
            : ['positive' as const, Check, 'Completed'];
    });

    const classes = $derived(
        twMerge('flex gap-1 items-center px-2.5 w-fit', condensed && 'text-xs px-2 py-1', rest.class)
    );
</script>

<Chip class={classes} variant={status}>
    <Icon class="size-3" strokeWidth={2} />
    <span class="text-xs">{text}</span>
</Chip>
