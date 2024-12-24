<script lang="ts">
    import { quadInOut } from 'svelte/easing';
    import { Tween } from 'svelte/motion';

    type Props = {
        value: number;
        duration?: number;
        format?: (value: number) => number | string;
    };

    const {
        format = (value) => Math.round(value),
        value = 0
    }: Props = $props();
    const animatedValue = new Tween(value, { duration: 100, easing: quadInOut });

    $effect(() => {
        animatedValue.set(value);
    });

</script>

<span class="animated-number">
    {format(animatedValue.current)}
</span>

<style>
  .animated-number {
    display: inline-block;
    font-weight: bold;
    transition: color 0.3s ease;
  }
</style>
