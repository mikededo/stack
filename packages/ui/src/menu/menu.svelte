<script lang="ts">
    import type { Icon as LucideIcon } from 'lucide-svelte';
    import type { ComponentType, Snippet } from 'svelte';

    import { clickAway } from '@stack/actions';
    import { getFocusableElements, Keys } from '@stack/utils';

    import { Loader } from 'lucide-svelte';
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
        wrapperClass?: string;
        loading?: boolean;
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
            'flex h-10 items-center gap-2 rounded-full text-sm',
            restProps.class
        )
    );
    const wrapperClasses = $derived(
        twMerge('relative', restProps.wrapperClass)
    );

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
            case Keys.ArrowDown: {
                const sameIndex = menuState.focusIndex + 1 === menuState.focusableElements.length;
                e.preventDefault();
                e.stopPropagation();
                menuState.focusableElements[menuState.focusIndex].focus();
                menuState.focusIndex = sameIndex ? 0 : menuState.focusIndex + 1;
                break;
            }
            case Keys.ArrowUp:
                e.preventDefault();
                menuState.focusableElements[menuState.focusIndex].focus();
                menuState.focusIndex =
                    menuState.focusIndex - 1 === -1
                        ? menuState.focusableElements.length - 1
                        : menuState.focusIndex - 1;
                break;
            case Keys.Escape:
                e.preventDefault();
                onHide();
                break;
        }
    };

    const useFocusableElements = (node: HTMLElement) => {
        menuState.focusableElements = getFocusableElements(node);
        node.focus();
    };
</script>

<div class={wrapperClasses}>
    <Button
        class={buttonClasses}
        color="surface"
        disabled={showMenu || loading}
        onclick={onToggle}
    >
        {#if loading}<Loader class="size-4 animate-spin" />{/if}
        {#if Icon && !loading}<Icon class="size-4" />{/if}
        {#if label}<span>{label}</span>{/if}
    </Button>

    {#if showMenu}
        <FloatingCard
            class="box-border overflow-hidden"
            role="menu"
            tabindex={1}
            use={[useFocusableElements, [clickAway, onHide]]}
            noPadding
            onkeydown={onNavigation}
        >
            <div
                class="flex max-h-96 w-full flex-col gap-[1px] overflow-y-auto overflow-x-hidden p-1 scrollbar-thin"
            >
                {@render children()}
            </div>
        </FloatingCard>
    {/if}
</div>
