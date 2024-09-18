import type { Action } from 'svelte/action';

import { clickAway } from '@stack/actions';
import { Keys } from '@stack/utils';

import { getNextGridCell } from '../context.svelte';

type UseCellArgs = {
  edit: boolean;
  onEdit: () => void;
  onStopEdit: () => void;
};

/**
 * Returns the parent row index 0-based!
 */
const getParentRowIndex = (node: HTMLDivElement) => {
  // The parent of the cell is always a div[role="row"], which must have an
  // aria-rowindex attribute
  // If checks fail, we throw as the grid is not correct
  if (!node.parentElement || node.parentElement.role !== 'row') {
    // Enforcing accessiblity
    throw new Error('Cell is missing a parent or role is not set to "row"');
  }
  const rowIndexString = node.parentElement.ariaRowIndex;
  if (rowIndexString === null) {
    // Enforcing accessiblity
    throw new Error('Cell parent is missing an aria-rowindex attribute');
  }
  if (isNaN(Number(rowIndexString))) {
    // Enforcing accessiblity
    throw new Error('Cell parent aria-rowindex is not a number');
  }

  // Subtract 1 as aria-rowindex is 1-based
  return Number(rowIndexString) - 1;
};

const isCellInEditMode = (node: HTMLDivElement) => node.dataset.editing === 'true';

type MoveArgs = {
  node: HTMLDivElement;
  x: number;
  /**
   * Passing an offset as the function gets the index from the cell
   */
  yOffset?: number;
};

/**
 * Moves the focus to the next cell in the grid, based on the actual cell aria-colindex
 * (1-base) which is calculated from the given node, and the x coordinate.
 *
 * If there's no cell for the given coordinates, the focus is not moved and the current
 * cell tabindex is unchanged.
 */
const onCellMove = ({ node, x, yOffset = 0 }: MoveArgs) => {
  const index = node.ariaColIndex;
  if (!index) {
    // Enforcing accessiblity
    throw new Error('Cell is missing an aria-colindex attribute');
  }
  // Subtract 2 as aria-colindex is 1-based
  const nextCell = getNextGridCell(x, +index + yOffset);
  if (!nextCell) {
    return;
  }

  nextCell.focus();
  // Update the tabindex
  node.tabIndex = -1;
};

export const useCell: Action<HTMLDivElement, UseCellArgs> = (
  node,
  { edit, onEdit, onStopEdit }
) => {
  const parentRowIndex = getParentRowIndex(node);

  const onEditKeydown = (event: KeyboardEvent) => {
    if (event.key === Keys.Enter) {
      onEdit();
      // Avoid adding a new line when pressing enter
      event.preventDefault();
    } else if (event.key === Keys.Escape) {
      // Stop editing
      onStopEdit();
    }
  };

  node.addEventListener('focus', () => {
    node.tabIndex = 0;
  });
  node.addEventListener('blur', () => {
    if (!edit) {
      node.tabIndex = -1;
    }
  });
  clickAway(node, () => {
    // tabIndex === 0 means the cell is focused
    if (isCellInEditMode(node) || node.tabIndex === 0) {
      onStopEdit();
      node.tabIndex = -1;
    }
  });
  node.addEventListener('keydown', (e) => {
    if (edit) {
      onEditKeydown(e);
    }

    // Do not change the focus if the cell is being edited
    if (isCellInEditMode(node)) {
      return;
    }

    switch (e.key) {
      case Keys.ArrowLeft:
        onCellMove({ node, x: parentRowIndex, yOffset: -2 });
        break;

      case Keys.ArrowRight:
        // Since it is 1-based, values are auto shifted
        onCellMove({ node, x: parentRowIndex, yOffset: 0 });
        break;

      case Keys.ArrowUp:
        onCellMove({ node, x: parentRowIndex - 1, yOffset: -1 });
        e.preventDefault(); // Prevents moving the scroll bar
        break;

      case Keys.ArrowDown:
        onCellMove({ node, x: parentRowIndex + 1, yOffset: -1 });
        e.preventDefault(); // Prevents moving the scroll bar
        break;
    }
  });
  if (edit) {
    node.addEventListener('dblclick', onEdit);
  }
};
