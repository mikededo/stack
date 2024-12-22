<script lang="ts">
    import { AnimatedNumber, Button, Header } from '$lib/components';
    import { sleep } from '$lib/utils';
    import { onMount } from 'svelte';

    const MAX_INPUT = `NNNNNNNOOOAJJJJJJJJZZMMMMMMMMUMMUCCCSSS
NNNNNNNOOOJJJJJJJJJZZMMMMMMMMMMMUCCCSSS
NNNNNNNNOJJJJJJJJMMMMMMMMMMMMMMMMCOOSSS
NNNNNNNJJJJJJJJJJJJMMMMMMMMMMMMMOOOOSSS
NNNNNNNNIJJJJJJJJJMMMMMMMMMMMMMMMMSSSSS
NNNNNNNIIJJJJJJJJJJMMMKMMMMMMMMMMMSSSSS
NNNNNNNIIJJJJJJJJJJMMMMMMMMMMMMMMMSSSSS
NNNNNNIIIIJLJJJJJJMMMMMMMMMMMMMMMMSSSSS
NNNNHHUIULLLJJJJJJMMMMMMMMMMMMMMMSSSSSS
NNNUUUUUULLLLJJJJJMMMMMMMMMMMMMMMMSSSSS
LLLUUUUULLLLJJJJMMMMMMMMMZZZZMMMZMSSSSS
LLJUUUUULLLLLLJJJJMMMMMMMMZZZZZZZZSSSSS
LLLLULUULLLLLLLZZZMMMEMMMOZZZZZZZZSSSSS
LLLLULLLLLLLLLLLZEEMMEEMOOZZZZZZZZSSSSS
LLLLLLLLLLLLLLLLZEEEEEEMOOZZZZZZZZZSSSS
LLLLLLLLLLLLLLLLEEEEEEEMOZZZZZZZZZZZZZZ
LLLLLLLLLDLLLLMMEOOOEEEOOOZZZZZZZZZZZZL
LLLLLLLLLLLLMMMMVOVOEOOOOOZZZZZZZZZZZZL
LLLLLLLLLLLLMMMMVVVOEOOOOOOZZZZZZZZZZWL
LLLLLLLLLLLMMMVVVOOOOOGGGGGGZZZZZZZZZZL
LLLLLLLLLLLMMVVVVVOGGGGGGGGGZZZZZZZOOUL
RRTTLLLLKKLVVVVVVVVWGGGGGGGGZZZZZZZZZUU
RTTTALLLKKLVVVVVVVVVGGGGGGGZZZZZZZZUQUU
TTTTTLLLKKVVVVVVVVVGGGGGGGGGEEEZZZLUUUU
TTKTTTTTKKKVVVVVVVVGGGGGGGGEEEEEEZEEUUU
TTTTTTTTNNKVVVVVVVVGGGGGGGGGEEEEEEEEUUU
TTTTTTTNNNKSVVVVVVVGGGGGGGGHHHHHHHEEUUU
TTTTTTTTNNKSSVVSSVGGGGGGGGGHHHHHHHEECCC
TTTTTTTTRRSSSBVSVVGGGGGGGGGHHHHHHHEUCCC
TTTTTTTTRTSSSSSSVGGGGGGGGHHHHHHHHHEVCCC
TTTTTTTTRTSSSSSSSLLLGGGGGHHHHHHHHHEVCCC
TTTTTTTTTTSSSSSSPLLLLGGGLHHHHHHHHHAVVVV
TTTTTTTTTTSSSSSSSLLLLLLLLHHHHHHHHHAVVVV
TTTTTTTTTTSSSSSSLLLLLLLLLHHHHHHHHHVVVVV
LLLLTTTTCCCCSSSSLLLLLLLLLHHHHHHHHHDVVVV
LLLLLTTTTTSSSSSSLJLLLLLLLHHHHHHHHHDVVVV
LLLLLTTTTLSSSSRJJJJLLLLLLHHHHHHHHHDVXVV
LLLLLLLLLLLLSJJJJRLLLLLZZHHHHHHHHHFFVVV
LLLLLLLLLLKKKJJJJRLLHHHHHHHHHHHHHHFFDMV
MLLLLLLLLLKKKJJJJJRLHHHHHHEDDDDDDDDDDMM`
        .split('\n')
        .map(line => line.split(''));

    const CONTAINER_ID = 'container';
    // Generate a list of tailwind classes background colors for the 600 value
    const COLORS = [
        'bg-violet-400',
        'bg-purple-400',
        'bg-fuchsia-400',
        'bg-pink-400',
        'bg-rose-400',
        'bg-red-400',
        'bg-orange-400',
        'bg-amber-400',
        'bg-yellow-400',
        'bg-lime-400',
        'bg-green-400',
        'bg-emerald-400',
        'bg-teal-400',
        'bg-cyan-400',
        'bg-sky-400',
        'bg-blue-400',
        'bg-indigo-400'
    ];

    let cost = $state(0);
    let running = $state(false);

    // Variables that have no need to be reactive
    let input: Array<Array<string>> = [];
    let executed = false;

    const neighbours = (x: number, y: number) =>
        [([x - 1, y]), ([x + 1, y]), ([x, y - 1]), ([x, y + 1])];

    const inRange = (x: number, y: number) =>
        y >= 0 && y < input[0].length && x >= 0 && x < input.length;

    type Borders = [top: boolean, right: boolean, bottom: boolean, left: boolean];
    const findBorders = (x: number, y: number): Borders => {
        const cell = input[x][y];
        return [
            !inRange(x - 1, y) || cell !== input[x - 1][y],
            !inRange(x, y + 1) || cell !== input[x][y + 1],
            !inRange(x + 1, y) || cell !== input[x + 1][y],
            !inRange(x, y - 1) || cell !== input[x][y - 1]
        ];
    };

    const start = async () => {
        cost = 0;
        const visited: Set<string> = new Set();

        const markAsVisited = (x: number, y: number, count: number) => {
            const div = document.getElementById(`${x}-${y}`);
            if (!div) {
                return;
            }

            div.classList.remove('bg-slate-50', 'border');
            div.classList.add(COLORS[count % COLORS.length]);

            const borders = findBorders(x, y);
            if (borders[0]) {
                div.classList.add('border-t');
            }
            if (borders[1]) {
                div.classList.add('border-r');
            }
            if (borders[2]) {
                div.classList.add('border-b');
            }
            if (borders[3]) {
                div.classList.add('border-l');
            }
        };

        const cellCount = { count: -1, prev: '' };
        for (let x = 0; x < input.length; x++) {
            for (let y = 0; y < input[x].length; y++) {
                const cell = input[x][y];
                if (cell !== cellCount.prev) {
                    cellCount.prev = cell;
                    cellCount.count += 1;
                }

                const id = `${x}-${y}`;
                if (visited.has(id)) {
                    continue;
                }

                visited.add(id);
                markAsVisited(x, y, cellCount.count);

                const queue: [number, number][] = [[x, y]];

                let edges = 0;
                let area = 0;

                await sleep(10);

                let end = queue.shift();
                while (end) {
                    area += 1;

                    for (const [nx, ny] of neighbours(...end)) {
                        if (!inRange(nx, ny)) {
                            edges += 1;
                            continue;
                        }

                        const id = `${nx}-${ny}`;
                        const value = input[nx][ny];
                        if (value === cell && !visited.has(id)) {
                            queue.push([nx, ny]);
                            visited.add(id);
                            markAsVisited(nx, ny, cellCount.count);

                            await sleep(10);
                        } else if (value !== cell) {
                            edges += 1;
                        }
                    }

                    end = queue.shift();
                }
                cost += area * edges;
            }
        }

        running = false;
    };

    // Generates the input for the flood fill algorithm. If it is the first
    // time that this is generated, it will update the `input` state with the
    // width-constrained input. Otherwise, it will use the previously generated
    // input.
    const generateInput = () => {
        const container = document.getElementById(CONTAINER_ID);
        if (!container) {
            return;
        }

        const maxCols = Math.floor(container.getBoundingClientRect().width / 24);

        const fragment = document.createDocumentFragment();
        let finalInput = '';
        (input.length ? input : MAX_INPUT).forEach((row, x) => {
            if (x >= maxCols) {
                return;
            }

            row.forEach((cell, y) => {
                if (y >= maxCols) {
                    return;
                }

                finalInput += cell;
                const div = document.createElement('div');
                div.id = `${x}-${y}`;
                div.classList.add(
                    'bg-slate-50',
                    'border',
                    'border-slate-50',
                    'size-[24px]',
                    'opacity-0',
                    'text-xs',
                    'flex',
                    'items-center',
                    'justify-center',
                    'transition-colors'
                );
                div.textContent = cell;
                fragment.appendChild(div);
                div.animate([
                    { opacity: 0 },
                    { opacity: 1 }
                ], { delay: 15 * y + 15 * x, duration: 100, fill: 'forwards', iterations: 1 });
            });
            finalInput += '\n';
        });

        if (!input.length) {
            input = finalInput.trim().split('\n').map(s => s.split(''));
        }
        container.style.gridTemplateColumns = `repeat(${Math.min(maxCols, input[0].length)}, 24px)`;
        container.replaceChildren(fragment);
    };

    const onClick = () => {
        if (!executed) {
            executed = true;
            running = true;
            start();
        } else {
            generateInput();
            setTimeout(() => {
                // Await for the cells to be rendered
                running = true;
                start();
            }, 1000);
        }
    };

    onMount(() => {
        generateInput();
    });
</script>

<!-- TODO: Extract into custom component -->
<svelte:head>
    <title>Visualization 12/2024</title>
    <meta name="description" content="Solution to 12th problem" />
</svelte:head>

<Header
    fileName="d12.rs"
    problemUrl="https://adventofcode.com/2024/day/12"
    title="Solution to the 12th problem"
    url="https://github.com/mikededo/advent/blob/main/aoc-24/src/solutions/d12.rs"
>
    {#snippet description()}
        <p>
            This problem is solved using a flood fill algorithm. The algorithm works by starting at a given point and then checking all the points around it and checking if they are part of the same group. If they are, then they are added to the group and the algorithm continues. If they are not, then they are added to a new group and the algorithm continues. This process continues until all the points are checked and added to a group.
        </p>
    {/snippet}
</Header>

<section>
    <h2 class="mt-4">Visualization</h2>
    <div class="flex w-full items-center justify-between gap-8 font-semibold">
        <p>Cost: <AnimatedNumber value={cost} /></p>
        <Button
            disabled={running}
            onclick={onClick}
        >
            {running ? 'Running' : 'Solve'}
        </Button>
    </div>
    <div id={CONTAINER_ID} class="mx-auto grid justify-center"></div>
</section>
