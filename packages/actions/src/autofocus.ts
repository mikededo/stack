import type { Action } from 'svelte/action';

export const useAutofocus: Action<HTMLElement, undefined> = (node) => {
  node.focus();
};
