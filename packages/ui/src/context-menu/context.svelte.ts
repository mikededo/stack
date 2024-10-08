import type { Action } from 'svelte/action';

type ContextMenu = { x: number; y: number };
export type Menu = { hide: () => void; state: ContextMenu | null };

export const createContextMenu = () => {
  let cmState = $state<ContextMenu | null>(null);

  const trigger: Action = (node) => {
    // When right clicking the element show a popover
    node.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      if (cmState) {
        cmState = null;
        setTimeout(() => {
          cmState = { x: event.clientX, y: event.clientY };
        }, 100);
      } else {
        cmState = { x: event.clientX, y: event.clientY };
      }
    });

    // Register a global eventListener to check if the context menu should be
    // hidden if the user right clicks somewhere else and the cm is opened
    const globalListener = (event: MouseEvent) => {
      if (cmState && event.target !== node) {
        cmState = null;
      }
    };

    document.addEventListener('contextmenu', globalListener, true);
    return {
      destroy() {
        document.removeEventListener('contextmenu', globalListener, true);
      }
    };
  };

  return {
    get menu(): Menu {
      const _internal = $derived(cmState);

      return {
        hide: () => {
          cmState = null;
        },
        get state() {
          return _internal;
        }
      };
    },
    states: {
      get isMenuActive() {
        const _internal = $derived(cmState !== null);
        return _internal;
      }
    },
    trigger
  };
};
