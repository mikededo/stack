<script lang="ts">
    import type { Snippet } from 'svelte';

    import { Cell } from './cell';

    type Props = {
        amountContent: Snippet;
        commentContent: Snippet;
        dateContent: Snippet;
        tagsContent: Snippet;
        amountEdit?: Cell['$$prop_def']['edit'];
        commentEdit?: Cell['$$prop_def']['edit'];
        dateEdit?: Cell['$$prop_def']['edit'];
        tagsEdit?: Cell['$$prop_def']['edit'];
    };
    const {
        amountContent,
        amountEdit,
        commentContent,
        commentEdit,
        dateContent,
        dateEdit,
        tagsContent,
        tagsEdit
    }: Props = $props();
</script>

<Cell class="w-32 shrink-0 p-3" aria-colindex={2} edit={dateEdit}>
    {@render dateContent()}
</Cell>

<Cell class="w-32 shrink-0 p-3" aria-colindex={3} edit={amountEdit}>
    {@render amountContent()}
</Cell>

<Cell class="relative w-full min-w-64 p-3" aria-colindex={4} edit={commentEdit}>
    {@render commentContent()}
</Cell>

<Cell class="w-48 shrink-0 p-3 md:w-72" aria-colindex={5} edit={tagsEdit}>
    {@render tagsContent()}
</Cell>
