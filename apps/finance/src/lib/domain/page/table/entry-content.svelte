<script lang="ts">
    import type { ComponentProps, Snippet } from 'svelte';

    import { Cell } from './cell';

    type Props = {
        amountContent: Snippet;
        commentContent: Snippet;
        dateContent: Snippet;
        tagsContent: Snippet;
        dateEdit?: ComponentProps<typeof Cell>['edit'];
        tagsEdit?: ComponentProps<typeof Cell>['edit'];
        amountEdit?: ComponentProps<typeof Cell>['edit'];
        commentEdit?: ComponentProps<typeof Cell>['edit'];
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

<Cell class="flex items-center w-32 shrink-0 p-3" aria-colindex={2} edit={dateEdit}>
    {@render dateContent()}
</Cell>

<Cell class="flex items-center w-32 shrink-0 p-3" aria-colindex={3} edit={amountEdit}>
    {@render amountContent()}
</Cell>

<Cell class="flex items-center relative w-full min-w-64 p-3" aria-colindex={4} edit={commentEdit}>
    {@render commentContent()}
</Cell>

<Cell class="flex items-center w-48 shrink-0 p-3 md:w-72" aria-colindex={5} edit={tagsEdit}>
    {@render tagsContent()}
</Cell>
