import type { Action } from 'svelte/action';

import { Keys } from '@stack/utils';

type UseOptionButtonArgs = {
  comment: string;
  inputRef: HTMLTextAreaElement | undefined;
  onHideAutocomplete: () => void;
  onValueChange: (value: string, fromFocus?: boolean) => void;
};

export const useOptionButton: Action<HTMLButtonElement, UseOptionButtonArgs> = (
  node,
  { comment, inputRef, onHideAutocomplete, onValueChange }
) => {
  const onOptionClick = () => {
    onValueChange(comment);
    onHideAutocomplete();
  };

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === Keys.Enter) {
      onOptionClick();
      e.stopPropagation();
    } else if (e.key === Keys.Escape) {
      // Focus input again
      inputRef?.focus();
      e.stopPropagation();
    }
  };

  const onOptionFocus = () => {
    onValueChange(comment, true);
  };

  node.addEventListener('keydown', onKeydown, true);
  node.addEventListener('mousedown', onOptionClick);
  node.addEventListener('focus', onOptionFocus);
};

type UseFieldAutofocusArgs = {
  onClearPreviewValue: () => void;
  onHideAutocomplete: () => void;
};

export const useFieldAutofocus: Action<HTMLElement, UseFieldAutofocusArgs> = (
  node,
  { onClearPreviewValue, onHideAutocomplete }
) => {
  node.focus();

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === Keys.Tab) {
      onHideAutocomplete();
    }
  };

  const onFocus = () => {
    // Clear the preview value anytime the textarea is focused
    onClearPreviewValue();
  };

  node.addEventListener('keydown', onKeydown);
  node.addEventListener('focus', onFocus);
};
