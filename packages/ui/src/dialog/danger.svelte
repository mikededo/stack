<script lang="ts">
    import type { Snippet } from 'svelte';

    import Dialog from './dialog.svelte';
    import { Button } from '../button/index.js';

    type Props = {
        children?: Snippet;
        disableConfirm?: boolean;
        disableCancel?: boolean;
        onConfirm: () => void;
        onCancel: () => void;
    };
    let { children, disableConfirm, disableCancel, onConfirm, onCancel }: Props = $props();
</script>

{#snippet header()}
    <span>Are you sure about this?</span>
{/snippet}

{#snippet footer()}
    <div class="ui-flex ui-items-center ui-justify-end ui-gap-2">
        <Button color="destructive" disabled={disableConfirm} onclick={onConfirm}>Delete</Button>
        <Button color="secondary" disabled={disableCancel} onclick={onCancel}>Cancel</Button>
    </div>
{/snippet}

<Dialog {header} {footer} onClose={onCancel}>
    {#if children}
        {@render children()}
    {:else}
        <p>This action is irreversible.</p>
    {/if}
</Dialog>
