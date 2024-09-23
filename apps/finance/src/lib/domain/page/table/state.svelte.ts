type TableState = {
  activeRow: null | number;
  newRowIndex: null | number;
};

const tableState = $state<TableState>({
  activeRow: null,
  newRowIndex: null
});
export { tableState };

export function newRowInto(index: number) {
  tableState.newRowIndex = index;
}

export function activateRow(index: number) {
  tableState.activeRow = index;
}
export function disableRow() {
  tableState.activeRow = null;
}
export const isRowActive = (index: number) => tableState.activeRow === index;
