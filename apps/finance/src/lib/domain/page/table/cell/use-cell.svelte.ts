import type { Action } from 'svelte/action';

import { clickAway } from '@stack/actions';
import { Keys } from '@stack/utils';

import { getGridRowCellCount, getGridRowCount, getNextGridCell } from '../context.svelte';

type UseCellArgs = {
  edit: boolean;
  onEdit: () => void;
  onStopEdit: () => void;
};

type RowStaticPositions = 'row-end' | 'row-start';
type GridStaticPositions = 'first-cell' | 'first-row' | 'last-cell' | 'last-row';
type MoveArgs = { node: HTMLDivElement } & (
  | {
      x: number;
      /**
       * Passing an offset as the function gets the index from the cell
       */
      yOffset?: number;
    }
  | { position: GridStaticPositions }
  | { position: RowStaticPositions; row: number }
);

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

/**
 * Checks if the cell is in edit mode through `data-editing` attribute.
 */
const isCellInEditMode = (node: HTMLDivElement) => node.dataset.editing === 'true';

/**
 * Returns the cell row index 0-based. If no index is found, an error is
 * thrown.
 */
const getCellRowIndex = (node: HTMLElement) => {
  const index = node.ariaColIndex;
  if (!index) {
    // Enforcing accessiblity
    throw new Error('Cell is missing an aria-colindex attribute');
  }
  return index;
};
const updateCellFocus = (node: HTMLDivElement, x: number, y: number) => {
  const nextCell = getNextGridCell(x, y);
  if (!nextCell) {
    return;
  }

  nextCell.focus();
  // Update the tabindex
  node.tabIndex = -1;
};

/**
 * Moves the focus to the next cell in the grid, based on the actual cell aria-colindex
 * (1-base) which is calculated from the given node, and the x coordinate.
 *
 * If there's no cell for the given coordinates, the focus is not moved and the current
 * cell tabindex is unchanged.
 */
const onCellMove = ({ node, ...args }: MoveArgs) => {
  if ('position' in args) {
    const { position } = args;
    switch (position) {
      // Row static positions
      case 'row-start': {
        updateCellFocus(node, args.row, 0);
        break;
      }
      case 'row-end': {
        const lastCell = getGridRowCellCount(args.row) - 1;
        if (lastCell < 0) {
          return;
        }

        updateCellFocus(node, args.row, lastCell);
        break;
      }

      // Grid static positions
      case 'first-cell': {
        updateCellFocus(node, 0, 0);
        break;
      }
      case 'first-row': {
        const index = getCellRowIndex(node);
        updateCellFocus(node, 0, +index - 1);
        break;
      }
      case 'last-cell': {
        const rowCount = Math.min(getGridRowCount() - 1);
        const lastCell = getGridRowCellCount(rowCount) - 1;
        if (lastCell < 0) {
          return;
        }
        updateCellFocus(node, rowCount, lastCell);
        break;
      }
      case 'last-row': {
        const index = getCellRowIndex(node);
        const rowCount = Math.min(getGridRowCount() - 1);
        updateCellFocus(node, rowCount, +index - 1);
        break;
      }
    }

    return;
  }

  const { x, yOffset = 0 } = args;
  const index = getCellRowIndex(node);
  updateCellFocus(node, x, +index + yOffset);
};

/**
 * The action is applied to each table cell (div[role="gridcell"]), and manages
 * keyboard navigation and editing functionality. Controls include: focus, keyboard
 * navigation (arrow keys, Home, End, PageUp, PageDown), and cell editing
 * events.
 * See {@link https://www.w3.org/WAI/ARIA/apg/patterns/grid/#datagridsforpresentingtabularinformation| DataGrids for Presenting Table Information}
 * for more information.
 *
 * **Keyboard Controls:**
 * - `Enter`: Begins editing the cell, preventing new line insertion.
 *   - `Escape`: Cancels editing.
 *   - `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`: Moves focus to neighboring cells.
 *   - `Home`, `End`: Moves focus to the start/end of the row, or the entire
 *   table when combined with `Ctrl`.
 *   - `PageUp`, `PageDown`: Moves focus to the first/last row.
 *
 * **Mouse Controls:**
 * - `dblclick`: Initiates cell editing (if the `edit` flag is true). - Click
 *   away functionality stops editing if the cell loses focus.
 *
 * **Tab Index Control:**
 * - `tabIndex` is dynamically managed. If the cell is focused, `tabIndex = 0`.
 *   If not, it is set to `-1` to remove it from the tab order. By default all
 *   cells should have `tabIndex` set to `-1`.
 *
 * **Critical Case:**
 * - Ensure that cell edit mode logic (`edit` flag and `isCellInEditMode`)
 *   correctly reflects the current state of the cell. The `onStopEdit`
 *   function is called when clicking away or pressing certain keys. This
 *   ensures the user doesn’t remain in edit mode unintentionally.
 */
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

      case Keys.Home:
        if (e.ctrlKey) {
          onCellMove({ node, position: 'first-cell' });
        } else {
          onCellMove({ node, position: 'row-start', row: parentRowIndex });
        }
        e.preventDefault(); // Prevents moving the scroll bar
        break;

      case Keys.End:
        if (e.ctrlKey) {
          onCellMove({ node, position: 'last-cell' });
        } else {
          onCellMove({ node, position: 'row-end', row: parentRowIndex });
        }
        e.preventDefault(); // Prevents moving the scroll bar
        break;

      case Keys.PageUp:
        onCellMove({ node, position: 'first-row' });
        e.preventDefault(); // Prevents moving the scroll bar
        break;

      case Keys.PageDown:
        onCellMove({ node, position: 'last-row' });
        e.preventDefault(); // Prevents moving the scroll bar
        break;
    }
  });
  if (edit) {
    node.addEventListener('dblclick', onEdit);
  }
};
