import type { Action } from 'svelte/action';

import { isValidDate } from '@stack/utils';

export const useDateMask: Action = (node) => {
  const onInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input) {
      return;
    }

    let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters

    // Format the input value as dd/mm/yyyy
    if (value.length > 2 && value.length <= 4) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    } else if (value.length > 4) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4, 8);
    }

    input.value = value;
    if (input.value.length === 10) {
      input.setAttribute('aria-invalid', `${!isValidDate(input.value)}`);
    }
  };

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Backspace') {
      return;
    }

    const input = event.target as HTMLInputElement;
    if (!input || !input.value) {
      return;
    }

    let value = input.value;
    // If the cursor is after a slash, remove the slash as well
    const start = input.selectionStart ?? input.value.length;
    if (value.charAt(start - 1) === '/') {
      event.preventDefault();
      input.setSelectionRange(start - 1, start - 1);
      input.value = value.slice(0, start - 1) + value.slice(start);
    }
  };

  node.addEventListener('input', onInput, true);
  node.addEventListener('keydown', onKeydown);

  return {
    destroy() {
      node.removeEventListener('input', onInput, true);
      node.removeEventListener('keydown', onKeydown);
    }
  };
};
