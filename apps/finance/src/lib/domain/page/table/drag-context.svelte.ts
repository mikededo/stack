import type { Expense } from '$lib/db';

import { getContext, setContext } from 'svelte';

type Position = { width: number; x: number; y: number };
type DragContext = {
  activeRow: Expense | null;
  isDragging: boolean;
  shadowPosition: Position;
};

const DRAG_CONTEXT_KEY = 'page:drag';
const dragContext = $state<DragContext>({
  activeRow: null,
  isDragging: false,
  shadowPosition: { width: 0, x: 0, y: 0 }
});

export function initDragContext() {
  setContext(DRAG_CONTEXT_KEY, dragContext);
}

export function getDragContext() {
  const context = getContext<DragContext>(DRAG_CONTEXT_KEY);
  if (!context) {
    throw new Error('Drag context not found');
  }

  return context;
}

export function onStartDragging(row: Expense, position: Position) {
  document.body.classList.add('!cursor-grabbing');
  document.querySelectorAll('div[role="grid"]').forEach((row) => {
    row.classList.add('select-none');
  });

  dragContext.activeRow = row;
  dragContext.isDragging = true;
  dragContext.shadowPosition = position;
}

export function onDrag(position: Omit<Position, 'width'>) {
  if (!dragContext.isDragging) {
    return;
  }

  dragContext.shadowPosition = {
    ...dragContext.shadowPosition,
    ...position
  };
}

export function onStopDragging() {
  dragContext.activeRow = null;
  dragContext.isDragging = false;
  dragContext.shadowPosition = { width: 0, x: 0, y: 0 };

  document.querySelectorAll('div[role="grid"]').forEach((row) => {
    row.classList.remove('select-none');
  });
  document.body.classList.remove('!cursor-grabbing');
}
