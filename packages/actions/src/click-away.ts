import type { Action } from 'svelte/action';

type ClickAwayHandler = (event: MouseEvent) => void;
type ClickAwayOptions = {
  /**
   * A callback that receives the event and should return `true`
   * if the click away should be executed
   */
  shouldClickAway?: (event: MouseEvent) => boolean;
};

type HandlerWithOptions = [ClickAwayHandler, ClickAwayOptions?];

export const clickAway: Action<HTMLElement, ClickAwayHandler | HandlerWithOptions> = (
  node,
  handler
) => {
  const isClickAway = (event: MouseEvent) =>
    !node.contains(event.target as HTMLElement) && !event.defaultPrevented;

  const executeHandler = (
    event: MouseEvent,
    handler: ClickAwayHandler,
    options?: ClickAwayOptions
  ) => {
    const { shouldClickAway } = options || {};
    if (isClickAway(event) && (!shouldClickAway || shouldClickAway(event))) {
      handler(event);
    }
  };

  const onClick = (event: MouseEvent) => {
    if (typeof handler === 'function') {
      executeHandler(event, handler as ClickAwayHandler);
    } else if (Array.isArray(handler)) {
      const [callback, options] = handler;
      executeHandler(event, callback, options);
    }
  };

  document.addEventListener('mousedown', onClick, true);

  return {
    destroy() {
      document.removeEventListener('mousedown', onClick, true);
    }
  };
};
