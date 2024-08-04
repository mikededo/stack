type TableState = {
  activeRow: number | null;
  newRowIndex: number | null;
};

let tableState = $state<TableState>({
  activeRow: null,
  newRowIndex: null
});
export { tableState };

export const newRowInto = (index: number) => {
  tableState.newRowIndex = index;
};

export const activateRow = (index: number) => {
  tableState.activeRow = index;
};
export const disableRow = () => {
  tableState.activeRow = null;
};
export const isRowActive = (index: number) => tableState.activeRow === index;
