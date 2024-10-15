<script lang="ts">
    import { clickAway } from '@stack/actions';
    import { getFocusableElements, Keys } from '@stack/utils';

    import { Loader, type Icon as LucideIcon } from 'lucide-svelte';
    import { type ComponentType, type Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';

    import { Button } from '../button/index.js';
    import { FloatingCard } from '../floating-card/index.js';

    type MenuState = {
        focusableElements: HTMLElement[];
        focusIndex: number;
        shown: boolean;
    };

    type Props = {
        children: Snippet;
        class?: string;
        loading?: boolean;
        wrapperClass?: string;
    } & (
        | { Icon: ComponentType<LucideIcon>; label?: string }
        | { label: string; Icon?: ComponentType<LucideIcon> }
    );
    const { children, Icon, label, loading, ...restProps }: Props = $props();

    let showMenu = $state(false);
    const menuState = $state<MenuState>({
        focusableElements: [],
        focusIndex: 0,
        shown: false
    });
    const buttonClasses = $derived(
        twMerge(
            'ui-flex ui-h-10 ui-items-center ui-gap-2 ui-rounded-full ui-text-sm',
            restProps.class
        )
    );
    const wrapperClasses = $derived(twMerge('relative', restProps.wrapperClass));

    const onToggle = () => {
        showMenu = !showMenu;
    };

    const onHide = async () => {
        showMenu = false;
    };

    const onNavigation = (e: KeyboardEvent) => {
        if (menuState.focusableElements.length === 0) {
            return;
        }

        switch (e.key) {
            case Keys.Escape:
                e.preventDefault();
                onHide();
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

<div class={wrapperClasses}>
    <Button class={buttonClasses}
        color="surface"
        disabled={showMenu || loading}
        onclick={onToggle}>
        {#if loading}<Loader class="ui-size-4 ui-animate-spin" />{/if}
        {#if Icon && !loading}<Icon class="size-4" />{/if}
        {#if label}<span>{label}</span>{/if}
    </Button>

    {#if showMenu}
        <FloatingCard
            class="ui-box-border ui-overflow-hidden"
            role="menu"
            tabindex={1}
            use={[useFocusableElements, [clickAway, onHide]]}
            noPadding
            onkeydown={onNavigation}
        >
            <div
                class="ui-flex ui-max-h-96 ui-w-full ui-flex-col ui-gap-[1px] ui-overflow-y-auto ui-overflow-x-hidden ui-p-1 ui-scrollbar-thin"
            >
                {@render children()}
            </div>
        </FloatingCard>
    {/if}
</div>
