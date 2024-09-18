<script lang="ts">
    import type { Snippet } from 'svelte';

    import { Button } from '../button/index.js';
    import Dialog from './dialog.svelte';

    type Props = {
        onCancel: () => void;
        onConfirm: () => void;
        children?: Snippet;
        disableCancel?: boolean;
        disableConfirm?: boolean;
    };
    let { children, disableCancel, disableConfirm, onCancel, onConfirm }: Props = $props();
</script>

{#snippet header()}
    <span>Are you sure about this?</span>
{/snippet}

{#snippet footer()}
    <div class="ui-flex ui-items-center ui-justify-end ui-gap-2">
        <Button color="surface" disabled={disableCancel} onclick={onCancel}>Cancel</Button>
        <Button color="destructive" disabled={disableConfirm} onclick={onConfirm}>Delete</Button>
    </div>
{/snippet}

<Dialog {footer} {header} onClose={onCancel}>
    {#if children}
        {@render children()}
    {:else}
        <p>This action is irreversible.</p>
    {/if}
</Dialog>
