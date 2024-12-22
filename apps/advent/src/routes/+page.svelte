<script lang="ts">
    import { ProblemCard } from '$lib/components';
    import { GithubIcon } from 'lucide-svelte';

</script>

<svelte:head>
    <title>AoC Visualizations - @mikededo</title>
</svelte:head>

<header>
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
<section>
    <h2>2024</h2>
    <div class="not-prose grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <ProblemCard title="12th" url="/2024/12">
            {#snippet description()}
                <p>
                    Implementation of a <em>&ldquo;flood fill&rdquo;</em> algorithm to dectect consequent areas.
                </p>
            {/snippet}
        </ProblemCard>
        <ProblemCard title="15th" url="/2024/15">
            {#snippet description()}
                <p>
                    Analyze the robot's actions while accounting for obstacles and blocked movements on a map.
                </p>
            {/snippet}
        </ProblemCard>
    </div>
</section>
