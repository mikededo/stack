<script lang="ts" module>
    import type { Icon as LucideIcon } from 'lucide-svelte';
    import type { ComponentType } from 'svelte';

    export type Tab = {
        name: string;
        Icon: ComponentType<LucideIcon>;
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

<div class="relative flex shrink-0 gap-1 rounded bg-surface-50 px-1 py-2">
    <div
        class="absolute bottom-1 top-1 rounded bg-white shadow transition-all"
        style={positionStyle}
    ></div>
    {#each tabs as { Icon, name, onClick }, i (i)}
        {#if i === initialTab}
            <!-- This is a workaround as the bind:this cannot be used conditionally  -->
            <button
                class="z-1 flex items-center gap-1.5 px-3 py-0.5"
                bind:this={initial}
                use:useTabButton
                onclick={onClick}
            >
                <Icon class="size-4" />
                <span>{name}</span>
            </button>
        {:else}
            <button
                class="z-1 flex items-center gap-1.5 px-3 py-0.5"
                use:useTabButton
                onclick={onClick}
            >
                <Icon class="size-4" />
                <span>{name}</span>
            </button>
        {/if}
    {/each}
</div>
