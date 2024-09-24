import type { Action } from 'svelte/action';

import { usePrefix } from './use-prefix.js';

export const usePercentageMask: Action = (node) => {
  if (!(node instanceof HTMLInputElement)) {
    return;
  }

  const onInput = () => {
    let value = node.value;

    value = value.replace(/\D/g, '');

    // Convert to number and limit to 0-100
    const numericValue = Number.parseInt(value, 10);
    if (!Number.isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
      node.value = numericValue.toString();
    } else {
      node.value = '';
    }
  };

  node.addEventListener('input', onInput, true);
  usePrefix(node, '% ');
};
