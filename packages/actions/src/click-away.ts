import type { Action } from 'svelte/action';

type ClickAwayHandler = ((e: MouseEvent) => void) | undefined;

export const clickAway: Action<HTMLElement, ClickAwayHandler> = (node, handler) => {
  const onClick = (event: MouseEvent) => {
    if (typeof handler !== 'function') {
      // Added to ensure TS
      return;
    }

    if (!node.contains(event.target as HTMLElement) && !event.defaultPrevented) {
      handler(event);
    }
  };

  document.addEventListener('mousedown', onClick, true);

  return {
    destroy() {
      document.removeEventListener('mousedown', onClick, true);
    }
  };
};
