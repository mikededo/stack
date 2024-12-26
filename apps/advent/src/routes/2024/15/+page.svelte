<script lang="ts">
    import type { Action } from 'svelte/action';

    import { toast } from '@stack/ui';

    import type { Cell, Point } from './utils.svelte';

    import { beforeNavigate } from '$app/navigation';
    import { Button, Header, ShikiCode, SMWarning, Textarea, Timer } from '$lib/components';
    import { BENCHMARK, DEFAULT_MAP, DEFAULT_MOVEMENTS } from '$lib/inputs/2024/input-15';
    import { matrixCanvasHelper } from '$lib/utils';

    import { algorithmState, CELL_COLORS, CELL_SIZE, CELL_TEXT_COLORS, runASolver } from './utils.svelte';

    const MOVEMENT_PLACEHOLDER = `Default movements are trimmed since the actual input is really long!
Movements consist of: <^v>...
You can also generate a set of random movements with the button below.`;
    const CONTAINER_ID = 'render-container';

    let isDragging = $state(false);
    let draggablePosition = $state(50);
    const mapWidth = $derived(draggablePosition);

    let container: HTMLDivElement | undefined = $state();
    let running: boolean = $state(false);
    let startTimer = $state(false);

    let mapInput: HTMLTextAreaElement | undefined = $state();
    let movementsInput: HTMLTextAreaElement | undefined = $state();

    const generateInput = () => {
        const container = document.getElementById(CONTAINER_ID) as HTMLCanvasElement | null;
        if (!container) {
            return;
        }

        running = true;
        let start: Point = [0, 0];
        const input = (mapInput?.value ? mapInput.value : DEFAULT_MAP)
            .trim()
            .split('\n')
            .map((line, i) => {
                const res = line.split('');
                const found = res.findIndex((c) => c === '@');
                if (found > -1) {
                    start = [i, found];
                }

                return res;
            }) as Cell[][];
        const matrix = matrixCanvasHelper<Cell>({
            options: {
                cellColors: CELL_COLORS,
                cellSize: CELL_SIZE,
                cellTextColors: CELL_TEXT_COLORS,
                input
            },
            root: container
        });
        if (!matrix) {
            toast.error('Unable to render the matrix');
            return;
        }

        const movements = (movementsInput?.value ? movementsInput.value : DEFAULT_MOVEMENTS)
            .trim()
            .split('\n')
            .map((s) => s.split(''))
            .flat();
        matrix.renderMatrix({
            onComplete: () => {
                algorithmState.map = input;
                algorithmState.movements = { executed: 0, left: movements.length };

                startTimer = true;
                runASolver(matrix, start, movements);
            }
        });
    };

    const useDraggable: Action<HTMLDivElement> = (node) => {
        node.addEventListener('mousedown', () => {
            isDragging = true;
        });

        const onMouseUp = () => {
            if (isDragging) {
                isDragging = false;
            }
        };

        const onMouseMove = (e: MouseEvent) => {
            if (isDragging && container) {
                const { width, x } = container.getBoundingClientRect();
                const relativeX = e.clientX - x;
                draggablePosition = Math.min(Math.max((relativeX / width) * 100, 25), 75);
            }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        return {
            destroy: () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
        };
    };

    beforeNavigate(() => {
        running = false;
        algorithmState.cancel = true;
        algorithmState.movements = { executed: 0, left: 0 };
    });
</script>

<Header
    fileName="d15.rs"
    problemUrl="https://adventofcode.com/2024/day/15"
    title="Solution to the 15th problem"
    url="https://github.com/mikededo/advent/blob/main/aoc-24/src/solutions/d15.rs"
>
    {#snippet description()}
        <SMWarning notImplemented />
        <p>
            The problem basically requires to execute a sequence of movements into a map. The map contains empty cells, boxes and walls. The movements are executed with following these rules:
        </p>
        <ul>
            <li>The player can freely move into any empty space.</li>
            <li>If the player has to move into a box, the box will be shifted into the same direction if there's an empty space after that position. However, if multiple boxes are aligned, the player would move as many boxes as required. If there's a wall after all the boxes, the boxes cannot be shifter and the player won't move.</li>
            <li>If there's a wall, the player won't be able to move.</li>
        </ul>
        <p>
            Parsing the map and executing the movements taking into account the rules is enough to get over the first problem. The second part is a bit more tricky as the initial map is extended. All parsed positions from the map are duplicated, meaning that boxes take up two spaces. This makes vertical movements more tricky, as a box may partially be in contact with another box. In order to solve this, instead of finding the first empty vertical space, we will find them with a triangular approach. The way I opted to solve it was to check if all boxes that were in contact could be moved. Unless they were all able, no movement would be made. The drawback about this approach is that you iterate twice (once for the search and a second time for the movement). Despite having a big map, the solution is really fast.
        </p>
        <ShikiCode code={BENCHMARK} options={{ lang: 'shellscript' }} />
    {/snippet}
</Header>

<section class="hidden md:block">
    <h2 class="mt-4">Customize your input</h2>
    <div bind:this={container} class="flex w-full flex-col items-center gap-2 md:flex-row">
        <div style="--input-width: {mapWidth}%" class="input flex flex-col gap-2">
            <Textarea
                placeholder={DEFAULT_MAP}
                rows={10}
                title="Map"
                bind:ref={mapInput}
            />
        </div>
        <div
            class="hidden h-10 w-1 shrink-0 cursor-ew-resize rounded-full bg-gray-200 md:block"
            use:useDraggable
        ></div>
        <div
            style="--input-width: {100 - mapWidth}%"
            class="input col-span-2 flex flex-col gap-2"
            class:pointer-events-none={isDragging}
        >
            <Textarea
                placeholder={MOVEMENT_PLACEHOLDER}
                rows={10}
                title="Movement"
                bind:ref={movementsInput}
            />
        </div>
    </div>
    <p>
        Once the map is rendered, know that: walls will be rendered with a darker color, empty spaces with a gray-ish tone, and boxes with a brown color. The robot will be rendered in blue!
        <br />
        The animation is really long, and in order to have a decent visualization with the total input, 2000 movements take 10 seconds, so the total animation lasts for 100 seconds (1 minute and 40 seconds).
    </p>
</section>

<section class="hidden md:block">
    <header class="flex items-end justify-between">
        <h2 class="mb-0">Visualization</h2>
        <div class="flex items-center gap-1">
            <Button onclick={generateInput}>{running ? 'Running' : 'Solve 1'}</Button>
            <Button disabled>Solve 2</Button>
        </div>
    </header>

    <div class="mb-2 flex items-center gap-4 font-semibold">
        <p>Movements to go: {algorithmState.movements.left}</p>
        <p>Movements executed: {algorithmState.movements.executed}</p>
        <div class="ml-auto">
            <Timer label="Time elapsed" running={startTimer} />
        </div>
    </div>

    <div id={CONTAINER_ID}></div>
</section>

<style lang="postcss">
.input {
  width: 100%;

  @media screen(md) {
    width: var(--input-width);
  }
}
</style>
