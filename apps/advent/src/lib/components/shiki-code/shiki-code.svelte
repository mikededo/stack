<script lang="ts">
    import './shiki-code.css';

    import type { codeToHtml, Highlighter } from 'shiki';

    import { getContext } from 'svelte';

    type CodeToHtml = Parameters<typeof codeToHtml>;
    type Props = {
        code: CodeToHtml[0];
        options: { lang: CodeToHtml[1]['lang'] } & Partial<CodeToHtml[1]>;
    };
    const { code, options }: Props = $props();
    const highlighter = getContext<Highlighter>('shiki');
</script>

<div class="shiki-wrapper not-prose my-1.5 rounded-sm px-5 py-3 text-sm">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html highlighter.codeToHtml(code, {
        ...options,
        defaultColor: false,
        themes: { light: 'github-light-default' }
    })}
</div>
