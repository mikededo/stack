<script context="module" lang="ts">
    import type { Icon as LucideIcon } from 'lucide-svelte';
    import type { ComponentType } from 'svelte';

    export type Tab = {
        Icon: ComponentType<LucideIcon>;
        name: string;
        onClick?: () => void;
    };
</script>

<script lang="ts">
    import type { Action } from 'svelte/action';

    type Props = { tabs: Tab[]; initialTab?: number };
    const { initialTab = 0, tabs }: Props = $props();

    let initial = $state<HTMLButtonElement | undefined>();
    let position = $state({ w: 0, x: 0 });
    const positionStyle = $derived(`width: ${position.w}px; left: ${position.x}px;`);

    const useTabButton: Action<HTMLButtonElement> = (node) => {
        const onClick = () => {
            const client = node.getBoundingClientRect();
            if (!client) {
                return;
            }

            position = { w: client.width, x: node.offsetLeft };
        };

        node.addEventListener('click', onClick);
        return {
            destroy() {
                node.removeEventListener('click', onClick);
            }
        };
    };

    $effect(() => {
        if (initial && initialTab !== undefined) {
            const client = initial.getBoundingClientRect();
            if (!client) {
                return;
            }

            position = { w: client.width, x: initial.offsetLeft };
        }
    });
</script>

<div class="ui-relative ui-flex ui-shrink-0 ui-gap-1 ui-rounded ui-bg-surface-50 ui-px-1 ui-py-2">
    <div
        class="ui-absolute ui-bottom-1 ui-top-1 ui-rounded ui-bg-white ui-shadow ui-transition-all"
        style={positionStyle}
    ></div>
    {#each tabs as { Icon, name, onClick }, i (i)}
        {#if i === initialTab}
            <!-- This is a workaround as the bind:this cannot be used conditionally  -->
            <button
                class="ui-z-[1] ui-flex ui-items-center ui-gap-1.5 ui-px-3 ui-py-0.5"
                bind:this={initial}
                use:useTabButton
                onclick={onClick}
            >
                <svelte:component this={Icon} class="size-4" />
                <span>{name}</span>
            </button>
        {:else}
            <button
                class="ui-z-[1] ui-flex ui-items-center ui-gap-1.5 ui-px-3 ui-py-0.5"
                use:useTabButton
                onclick={onClick}
            >
                <svelte:component this={Icon} class="size-4" />
                <span>{name}</span>
            </button>
        {/if}
    {/each}
</div>
