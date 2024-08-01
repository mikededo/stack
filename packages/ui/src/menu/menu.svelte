<script lang="ts">
    import { type Icon as LucideIcon } from 'lucide-svelte';
    import { type ComponentType, type Snippet } from 'svelte';

    import { Button } from '../button/index.js';
    import { FloatingCard } from '../floating-card/index.js';

    type Props = {
        label: string;
        Icon: ComponentType<LucideIcon>;
        children: Snippet;
    };
    let { label, children, Icon }: Props = $props();

    let showMenu = $state(false);

    const handleOnToggle = () => {
        showMenu = !showMenu;
    };

    const handleOnHide = async () => {
        showMenu = false;
    };
</script>

<div class="relative">
    <Button
        color="secondary"
        class="ui-flex ui-h-10 ui-items-center ui-gap-2 ui-rounded-full ui-text-sm"
        onclick={handleOnToggle}
        disabled={showMenu}
    >
        {#if Icon}
            <svelte:component this={Icon} class="size-4" />
        {/if}
        <span>{label}</span>
    </Button>

    {#if showMenu}
        <FloatingCard onClickAway={handleOnHide}>
            {@render children()}
        </FloatingCard>
    {/if}
</div>
