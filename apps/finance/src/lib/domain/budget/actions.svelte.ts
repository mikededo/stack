import type { Action } from 'svelte/action';

import { Keys } from '@stack/utils';

const TYPE_SPEED_MS = 38;
const TYPE_PAUSE_MS = 2500;
const DELETE_SPEED_MS = 15;
const DELETE_PAUSE_MS = 500;

const PLACEHOLDERS = [
  'Basic needs first',
  'Minimalist living',
  'Debt avalanche to debt-free',
  '50/30/20 Rule',
  'Savings first',
  'Balanced lifestyle',
  'Frugal living',
  'Investment focus',
  'Emergency fund builder',
  'Luxury spending control'
];

export const useAnimatedPlaceholder: Action = (node) => {
  // TS check, as the action is only used on input elements
  if (!(node instanceof HTMLInputElement)) {
    return;
  }

  let timeout = $state<number | undefined>();
  let placeholderIndex = $state(0);
  let charIndex = $state(0);

  const nextStep = (callback: () => void, delay: number): void => {
    if (timeout) {
      window.clearTimeout(timeout);
    }

    if (node.value) {
      return;
    }

    timeout = window.setTimeout(callback, delay);
  };

  const type = (): void => {
    // If there is a value, we cut the setTimeout chain
    if (node.value) {
      return;
    }

    const placeholder = PLACEHOLDERS[placeholderIndex];
    const newPlaceholder = placeholder.slice(0, charIndex);
    node.setAttribute('placeholder', newPlaceholder);

    if (charIndex < placeholder.length) {
      ++charIndex;
      nextStep(type, TYPE_SPEED_MS);
    } else {
      charIndex = 0;
      nextStep(() => {
        // eslint-disable-next-line ts/no-use-before-define
        remove(placeholder);
      }, TYPE_PAUSE_MS);
    }
  };

  const remove = (placeholder: string): void => {
    // If there is a value, we cut the setTimeout chain
    if (node.value) {
      return;
    }

    const newPlaceholder = placeholder.slice(0, -1);
    node.setAttribute('placeholder', newPlaceholder);

    if (newPlaceholder.length > 0) {
      nextStep(() => {
        remove(newPlaceholder);
      }, DELETE_SPEED_MS);
    } else {
      placeholderIndex = (placeholderIndex + 1) % PLACEHOLDERS.length;
      nextStep(type, DELETE_PAUSE_MS);
    }
  };

  if (!node.value) {
    type();
  }

  return {
    destroy() {
      if (timeout) {
        window.clearTimeout(timeout);
      }
    }
  };
};

export const useUpDownArrows: Action<HTMLElement, string> = (node, prefix) => {
  // TS check, as the action is only used on input elements
  if (!(node instanceof HTMLInputElement)) {
    return;
  }

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === Keys.ArrowUp) {
      if (node.value) {
        const [_, value] = node.value.split(prefix);
        const num = Number(value) + 1;
        node.value = `${prefix}${num}`;
      } else {
        node.value = '€ 1';
      }

      // Dispatch an input event to trigger the oninput handler
      node.dispatchEvent(new InputEvent('input', { bubbles: true }));
    }

    if (event.key === Keys.ArrowDown) {
      if (node.value) {
        const [_, value] = node.value.split(prefix);
        const num = Math.max(0, Number(value) - 1);
        node.value = `${prefix}${num}`;
      }

      // Dispatch an input event to trigger the oninput handler
      node.dispatchEvent(new InputEvent('input', { bubbles: true }));
    }
  };

  node.addEventListener('keydown', onKeydown);

  return {
    destroy() {
      node.removeEventListener('keydown', onKeydown);
    }
  };
};
