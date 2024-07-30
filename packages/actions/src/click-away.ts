import type { Action } from 'svelte/action';

type Handler = () => void | undefined;

export const clickAway: Action<HTMLElement, Handler> = (node, handler) => {
  const onClick = (event: MouseEvent) => {
    if (!node.contains(event.target as HTMLElement) && !event.defaultPrevented) {
      handler?.();
    }
  };

  document.addEventListener('click', onClick, true);
  return {
    destroy() {
      document.removeEventListener('click', onClick, true);
    }
  };
};
