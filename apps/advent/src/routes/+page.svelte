<script lang="ts">
    import { GithubIcon } from 'lucide-svelte';

    import { paddedContainerClasses, ProblemCard } from '$lib/components';

    import { SOLUTIONS } from './solutions';

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

{#each Object.entries(SOLUTIONS) as [year, days](year)}
    {@const entries = Object.entries(days)}

    <section class={paddedContainerClasses('lg:pt-6')}>
        <h2 class="m-0">{year}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 mb-4 not-prose">
            {#each entries as [day, problem](day)}
                {#if problem}
                    <ProblemCard title={problem.title} url={problem.href}>
                        {#snippet description()}
                            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                            <p>{@html problem.description}</p>
                        {/snippet}
                    </ProblemCard>
                {/if}
            {/each}
        </div>

    </section>
{/each}
