type TableState = {
  activeRow: null | number;
  newRowIndex: null | number;
};

const tableState = $state<TableState>({
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
