import type { Action } from 'svelte/action';

import { getFocusableElements, Keys } from '@stack/utils';

export const useTrapFocus: Action = (node) => {
  const onKeydown = (e: KeyboardEvent) => {
    const focusableElements = getFocusableElements(node);
    const iof = focusableElements.indexOf(document.activeElement as HTMLElement);

    if (e.key === Keys.ArrowDown || e.key === Keys.Tab) {
      e.preventDefault();
      const nextIndex = (iof + 1) % focusableElements.length;
      focusableElements[nextIndex].focus();
    } else if (e.key === Keys.ArrowUp || (e.key === Keys.Tab && e.shiftKey)) {
      const prevIndex = (iof - 1 + focusableElements.length) % focusableElements.length;
      focusableElements[prevIndex].focus();
    }
  };

  node.addEventListener('keydown', onKeydown);

  return {
    destroy() {
      node.removeEventListener('keydown', onKeydown);
    }
  };
};
