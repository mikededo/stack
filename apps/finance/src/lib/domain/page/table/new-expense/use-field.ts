import type { Action } from 'svelte/action';

import { useAutofocus } from '@stack/actions';
import { Keys } from '@stack/utils';

type UseFieldArgs = { actions: Array<Action<HTMLElement>> };

export const useField: Action<HTMLElement, UseFieldArgs> = (node, { actions }) => {
  useAutofocus(node);
  actions.forEach((action) => {
    action(node);
  });

  node.addEventListener('keydown', (e) => {
    if (e.key === Keys.Enter) {
      e.stopPropagation();
    }
  });
};
