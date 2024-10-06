import type { Action } from 'svelte/action';

import type { Expense } from '$lib/db';

import { useCell } from '../cell';
import { getDragContext, onDrag, onStartDragging, onStopDragging } from './drag-context.svelte';

type UseDragCellArgs = {
  expense: Expense;
  rowNode: HTMLDivElement;
};
export const useDragCell: Action<HTMLElement, UseDragCellArgs> = (node, { expense, rowNode }) => {
  const dragContext = getDragContext();

  const onMouseMove = (e: MouseEvent) => {
    if (!dragContext.isDragging || dragContext.activeRow?.id !== expense?.id) {
      return;
    }

    onDrag({ x: e.clientX, y: e.clientY });
  };

  const onMouseUp = () => {
    onStopDragging();
    if (dragContext.placeholderRowIndex) {
      dragContext.placeholderRowIndex = null;
    }
  };

  const onMouseDown = (e: MouseEvent) => {
    if (!rowNode) {
      return;
    }

    const { width } = rowNode.getBoundingClientRect();
    onStartDragging(expense, { width, x: e.clientX, y: e.clientY });
  };

  useCell(node, undefined);
  node.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  return {
    destroy() {
      document.removeEventListener('mouseup', onMouseUp);
      document.querySelectorAll('div[role="grid"]').forEach((row) => {
        row.classList.remove('select-none');
      });
    }
  };
};
