import type { Action } from 'svelte/action';

export const useAutofocus: Action = (node) => {
  node.focus();
};
