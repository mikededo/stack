<script lang="ts">
    import type { Snippet } from 'svelte';

    type Props = {
        title: string;
        url: string;
        /**
         * Description is rendered inside a `div`
         */
        description: Snippet;
    };
    const { description, title, url }: Props = $props();
</script>

<a
    class="flex flex-col gap-1 border px-3 py-2 bg-background transition-all rounded-lg duration-200 hover:shadow-md hover:shadow-surface-100 hover:border-primary-300 hover:-translate-y-1 md:px-3"
    href={url}
>
    <p class="font-semibold">{title}</p>
    <div class="text-sm">
        {@render description()}
    </div>
    <div class="flex flex-wrap items-center gap-1">
        <div class="m-1 flex items-center justify-center rounded-full border border-purple-100 bg-purple-100 px-2 py-1 font-medium text-purple-500">
            <div class="text-xs font-normal leading-none">Algorithm</div>
        </div>
    </div>
</a>
