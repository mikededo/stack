import type { Action } from 'svelte/action';

import { usePrefix } from './use-prefix.js';

export const usePercentageMask: Action = (node) => {
  if (!(node instanceof HTMLInputElement)) {
    return;
  }

  const onInput = () => {
    let value = node.value;

    value = value.replace(/[^\d]/g, '');

    // Convert to number and limit to 0-100
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 100) {
      node.value = numericValue.toString();
    } else {
      node.value = '';
    }
  };

  node.addEventListener('input', onInput, true);

  const prefix = usePrefix(node, '% ');

  return {
    destroy() {
      node.removeEventListener('input', onInput, true);
      prefix.destroy?.();
    }
  };
};