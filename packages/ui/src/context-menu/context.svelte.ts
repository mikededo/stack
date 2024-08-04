import type { Action } from 'svelte/action';

type ContextMenu = { x: number; y: number };
export type Menu = { state: ContextMenu | null; hide: () => void };

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
  };

  return {
    states: {
      get isMenuActive() {
        let _internal = $derived(cmState !== null);
        return _internal;
      }
    },
    trigger,
    get menu(): Menu {
      let _internal = $derived(cmState);

      return {
        get state() {
          return _internal;
        },
        hide: () => {
          cmState = null;
        }
      };
    }
  };
};
