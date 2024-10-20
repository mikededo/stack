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
  const onOptionClick = (e: Event) => {
    e.stopPropagation();

    onValueChange(comment);
    onHideAutocomplete();
  };

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === Keys.Enter) {
      onOptionClick(e);
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
  node.addEventListener('mousedown', onOptionClick, true);
  node.addEventListener('focus', onOptionFocus);
};

type UseFieldAutofocusArgs = {
  onClearPreviewValue: () => void;
  onHideAutocomplete: () => void;
  onValueChange: (value: string) => void;
};

export const useComment: Action<HTMLElement, UseFieldAutofocusArgs> = (
  node,
  { onClearPreviewValue, onHideAutocomplete, onValueChange }
) => {
  node.focus();

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === Keys.Tab) {
      onHideAutocomplete();
    } else if (e.key === Keys.Enter) {
      if ('value' in node) {
        onValueChange(node.value);
        e.stopPropagation();
      }
    }
  };

  const onFocus = () => {
    // Clear the preview value anytime the textarea is focused
    onClearPreviewValue();
  };

  node.addEventListener('keydown', onKeydown);
  node.addEventListener('focus', onFocus);
};
