<script lang="ts">
    import type { Year } from '$lib/utils';

    import { paddedContainerClasses } from './padded-container.svelte';
    import ProblemCard from './problem-card.svelte';

    type Props = {
        days: Year;
        year: number;
        position: number;
    };
    const { days, position, year }: Props = $props();

    const entries = Object.entries(days);
</script>

<section
    class={paddedContainerClasses('lg:pt-6 relative h-grid-line')}
    style={`--grid-animation-delay: calc(${position} * 0.15s)`}
>
    <div
        class="z-0 absolute top-0 left-0 text-[124px] lg:text-[240px] font-bold font-mono opacity-5 lg:-translate-y-8 leading-none"
        aria-hidden={true}
    >
        {year}
    </div>
    <h2 class="mt-0!">{year}</h2>
    <div class="relative grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 mb-4 not-prose">
        {#each entries as [day, problem](day)}
            <ProblemCard {problem} />
        {/each}
    </div>
</section>

