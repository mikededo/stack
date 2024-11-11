<script lang="ts">

    import type { PageData } from './$types';

    import { Editor, EditorKeyList } from '$lib/domain/editor';

    type Props = { data: PageData };
    const { data }: Props = $props();
    const id = +data.id;
</script>

<h1>Editor</h1>

<div class="grid grid-cols-3 w-full gap-x-8">
    <div class="col-span-2">
        <Editor project={id} />
    </div>
    <EditorKeyList project={id} />
</div>
