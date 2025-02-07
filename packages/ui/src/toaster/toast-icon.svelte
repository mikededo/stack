<script lang="ts">
    import type { ToastTypes } from './state.svelte.js';

    import { CircleAlert, CircleCheckBig, CircleX, Info } from 'lucide-svelte';

    type Props = { type: ToastTypes };
    const { type: toastType = 'success' }: Props = $props();

    const classes = 'ui:size-4';
</script>

{#if toastType === 'success'}
    <CircleCheckBig class={classes} />
{:else if toastType === 'warning'}
    <CircleAlert class={classes} />
{:else if toastType === 'error'}
    <CircleX class={classes} />
{:else if toastType === 'info'}
    <Info class={classes} />
{/if}
