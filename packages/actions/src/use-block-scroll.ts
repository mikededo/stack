import type { Action } from 'svelte/action';

export const useBlockScroll: Action = () => {
  if (!document) {
    console.log('useBlockScroll cannot be used on the server');
    return;
  }

  document.body.style.overflow = 'hidden';

  return {
    destroy() {
      document.body.style.overflow = '';
    }
  };
};
