export const usePrefix = (node: HTMLInputElement, prefix: string): void => {
  const onInput = () => {
    if (!node.value.startsWith(prefix) && node.value) {
      node.value = prefix + node.value;
    } else if (node.value === '' || node.value === prefix) {
      node.value = '';
    }
  };

  node.addEventListener('input', onInput, true);
  onInput();
};
