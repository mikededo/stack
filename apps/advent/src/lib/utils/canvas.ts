import { hexToRgb } from './colors';

export type Point = [number, number];

/** Method arguments */
type RenderMatrixArgs = {
  onComplete?: () => void;
};

type MatrixCanvasHelperArgs<Cell extends string> = {
  options: {
    cellSize: number;
    input: Cell[][];
    cellColors: Record<Cell, string>;
    cellTextColors: Record<Cell, string>;
  };
  root: HTMLElement;
};
export type MatrixCanvasHelper<Cell extends string> = NonNullable<ReturnType<typeof matrixCanvasHelper<Cell>>>;

export const matrixCanvasHelper = <Cell extends string>(
  { options, root }: MatrixCanvasHelperArgs<Cell>
) => {
  const { cellSize, input } = options;

  // Create and render the canvas
  const canvas = document.createElement('canvas');
  const dpr = window.devicePixelRatio || 1;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.warn('Unable to get canvas context');
    return;
  }

  canvas.classList.add('mx-auto');
  root.replaceChildren(canvas);

  const rows = input.length;
  const cols = input[0].length;

  const logicalWidth = cols * cellSize;
  const logicalHeight = rows * cellSize;

  canvas.style.width = `${logicalWidth}px`;
  canvas.style.height = `${logicalHeight}px`;
  canvas.width = logicalWidth * dpr;
  canvas.height = logicalHeight * dpr;
  ctx.scale(dpr, dpr);

  const fillRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    cell: Cell,
    progress = 100
  ) => {
    const { cellColors, cellTextColors } = options;
    const rectX = y * cellSize;
    const rectY = x * cellSize;

    ctx.fillStyle = `rgba(${hexToRgb(cellColors[cell])}, ${(progress / 100)})`;
    ctx.fillRect(rectX, rectY, cellSize, cellSize);
    ctx.font = '12px "IBM Plex Mono"';
    ctx.fillStyle = cellTextColors[cell];
    ctx.fillText(cell, rectX + 4, rectY + 12);
  };

  const renderMatrix = (options: RenderMatrixArgs = {}) => {
    const renderingState: {
      delay: number;
      x: number;
      y: number;
      progress: number;
    }[] = [];

    input.forEach((row, x) => {
      row.forEach((_, y) => {
        // Delay the start time based on cell position
        renderingState.push({ delay: (x + y) * 15, progress: -1, x, y });
      });
    });

    const startTime = Date.now();
    const animateCells = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      renderingState.forEach((state) => {
        const { delay, progress, x, y } = state;
        const cell = input[x][y];

        if (state.progress >= 0) {
          fillRect(ctx, x, y, cell, progress);
        }

        if (progress < 100) {
          state.progress = Math.min(
            100,
            state.progress < 0
              ? (Date.now() - startTime > delay ? 0 : -1)
              : state.progress + 5
          );
        }
      });

      // Keep running until all completed
      if (renderingState.some(state => state.progress < 100)) {
        requestAnimationFrame(() => {
          animateCells();
        });
      } else {
        options.onComplete?.();
      }
    };

    animateCells();
  };

  return {
    ctx,
    fillRect: (x: number, y: number, cell: Cell) => {
      fillRect(ctx, x, y, cell);
    },
    renderMatrix
  };
};
