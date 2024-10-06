<script lang="ts">
    import { GripVertical } from 'lucide-svelte';

    import { Cell } from '../cell';
    import { useDragCell } from './use-drag-cell';

    type Props = Parameters<typeof useDragCell>[1];
    const { ...restProps }: Props = $props();
</script>

<Cell
    class="w-8 flex pt-3.5 justify-center shrink-0 cursor-grab"
    aria-colindex={1}
    use={[[useDragCell, restProps]]}
>
    <GripVertical class="fill-surface-500" size={16} />
</Cell>
