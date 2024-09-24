import type { Action } from 'svelte/action';

import { usePrefix } from './use-prefix.js';

export const useMoneyMask: Action = (node) => {
  if (!(node instanceof HTMLInputElement)) {
    return;
  }

  const onInput = () => {
    let value = node.value;

    // Allow only numbers and one dot
    value = value.replace(/[^0-9.]/g, '');

    // Ensure only one dot is present
    const parts = value.split('.');
    if (parts.length > 2) {
      value = `${parts[0]}.${parts.slice(1).join('')}`;
    }

    // Limit to two decimal places
    if (parts[1] && parts[1].length > 2) {
      value = `${parts[0]}.${parts[1].substring(0, 2)}`;
    }

    node.value = value;
  };

  node.addEventListener('input', onInput, true);
  // Register also the prefix of the currency
  usePrefix(node, '€ ');
};
