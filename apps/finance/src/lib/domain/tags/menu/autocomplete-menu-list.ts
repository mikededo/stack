import type { Tag } from '$lib/db';
import type { Action } from 'svelte/action';

import { Keys } from '@stack/utils';

type UseMenuOptionArgs = {
  inputRef: HTMLInputElement | undefined;
  value: Tag;
  onValueChange: (id: Tag['id']) => void;
};

export const useInputMenuOption: Action<HTMLElement, UseMenuOptionArgs> = (
  node,
  { inputRef, onValueChange, value }
) => {
  const onOptionClick = () => {
    onValueChange(value.id);
  };

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === Keys.Enter) {
      onOptionClick();
      inputRef?.focus();
    } else if (e.key === Keys.Escape) {
      // Focus input again
      inputRef?.focus();
    }
  };

  node.addEventListener('keydown', onKeydown);
  node.addEventListener('mousedown', onOptionClick);
};
