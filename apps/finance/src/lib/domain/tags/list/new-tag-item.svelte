<script lang="ts">
    import { Chip, ListItem } from '@mstack/ui';

    import { Tag } from 'lucide-svelte';

    import ColorInput from './color-input.svelte';
    import { isTagValid } from './helpers';
    import NameInput from './name-input.svelte';

    type Props = {
        color: string;
        name: string;
        onCancel?: () => void;
        onConfirm?: () => void;
    };
    let { color = $bindable(), name = $bindable(), onCancel, onConfirm }: Props = $props();

    const handleOnConfirm = () => {
        if (isTagValid(name, color)) {
            onConfirm?.();
        }
    };
</script>

<ListItem class="flex w-full items-center justify-between px-3 py-2">
    <div class="flex w-full items-center gap-2">
        <Tag class="size-4" strokeWidth={2.5} />
        <NameInput bind:value={name} {onCancel} onConfirm={handleOnConfirm} />
    </div>
    <div class="flex shrink-0 items-center gap-4">
        <Chip {color}>{name ? name : 'Tag name'}</Chip>
        <ColorInput bind:value={color} {onCancel} onConfirm={handleOnConfirm} />
        <div class="size-5 rounded" style="background-color: {color}"></div>
    </div>
</ListItem>
