<script lang="ts" context="module">
    type MenuState = {
        shown: boolean;
        focusableElements: HTMLElement[];
        focusIndex: number;
    };
</script>

<script lang="ts">
    import { clickAway } from '@mstack/actions';
    import { Keys, getFocusableElements } from '@mstack/utils';

    import { type Icon as LucideIcon } from 'lucide-svelte';
    import { type ComponentType, type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';

    import { Button } from '../button/index.js';
    import { FloatingCard } from '../floating-card/index.js';

    type Props = {
        children: Snippet;
        class?: string;
    } & (
        | { Icon: ComponentType<LucideIcon>; label?: string }
        | { Icon?: ComponentType<LucideIcon>; label: string }
    );
    let { label, children, Icon, ...restProps }: Props = $props();

    let showMenu = $state(false);
    let menuState = $state<MenuState>({
        shown: false,
        focusableElements: [],
        focusIndex: 0
    });
    let buttonClasses = $derived(
        twMerge(
            'ui-flex ui-h-10 ui-items-center ui-gap-2 ui-rounded-full ui-text-sm',
            restProps.class
        )
    );

    const handleOnToggle = () => {
        showMenu = !showMenu;
    };

    const handleOnHide = async () => {
        showMenu = false;
    };

    const handleOnNavigation = (e: KeyboardEvent) => {
        if (menuState.focusableElements.length === 0) {
            return;
        }

        switch (e.key) {
            case Keys.Escape:
                e.preventDefault();
                handleOnHide();
                break;
            case Keys.ArrowDown:
                e.preventDefault();
                e.stopPropagation();
                menuState.focusableElements[menuState.focusIndex].focus();
                menuState.focusIndex =
                    menuState.focusIndex + 1 === menuState.focusableElements.length
                        ? 0
                        : menuState.focusIndex + 1;
                break;
            case Keys.ArrowUp:
                e.preventDefault();
                menuState.focusableElements[menuState.focusIndex].focus();
                menuState.focusIndex =
                    menuState.focusIndex - 1 === -1
                        ? menuState.focusableElements.length - 1
                        : menuState.focusIndex - 1;
                break;
        }
    };

    const useFocusableElements = (node: HTMLElement) => {
        menuState.focusableElements = getFocusableElements(node);
        node.focus();
    };
</script>

<div class="relative">
    <Button color="secondary" class={buttonClasses} onclick={handleOnToggle} disabled={showMenu}>
        {#if Icon}<svelte:component this={Icon} class="size-4" />{/if}
        {#if label}<span>{label}</span>{/if}
    </Button>

    {#if showMenu}
        <FloatingCard
            role="menu"
            tabindex={1}
            onkeydown={handleOnNavigation}
            onClickAway={handleOnHide}
            use={[useFocusableElements, [clickAway, handleOnHide]]}
        >
            {@render children()}
        </FloatingCard>
    {/if}
</div>
