<script lang="ts">
    type Props = { delay: number; class?: string; right?: boolean };
    const { delay, right = false, ...props }: Props = $props();

    const style = [
        ['--grid-animation-delay', `${delay}s`],
        ['left', right ? '' : '0'],
        ['right', right ? '0' : '']
    ].reduce((style, [key, value]) => !value ? style : `${key}: ${value};${style}`, '');
</script>

<div aria-hidden="true" class={`v-grid-line ${props.class}`} style={style}></div>

