<script lang="ts">
    import { GithubIcon } from 'lucide-svelte';

    import { paddedContainerClasses, YearSection } from '$lib/components';
    import { SOLUTIONS } from '$lib/data';
</script>

<svelte:head>
    <title>AoC Visualizations - @mikededo</title>
</svelte:head>

<header class={paddedContainerClasses('lg:pb-6')}>
    <nav>
        <a
            class="mb-2 flex items-center justify-end gap-2 text-sm text-[var(--tw-prose-headings)] no-underline"
            href="/"
            rel="external"
            target="_blank"
        >
            <GithubIcon class="size-4" strokeWidth={2} />
        </a>
    </nav>
    <h1>Advent of Code Visualizations</h1>
    <p>
        A collection of visualizations for Advent of Code problems, from some of the problems that I've solved. You can find the solutions in this
        <a
            href="https://github.com/mikededo/avent"
            rel="external"
            target="_blank"
        >
            repository
        </a>.
    </p>
</header>

{#each Object.entries(SOLUTIONS).reverse() as [year, days], i(year)}
    <YearSection position={i} year={+year} {days} />
{/each}

