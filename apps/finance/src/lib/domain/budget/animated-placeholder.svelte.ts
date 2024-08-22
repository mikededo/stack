import type { Action } from 'svelte/action';

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

export const useAnimatedPlaceholder: Action<HTMLInputElement> = (node) => {
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
      nextStep(() => remove(placeholder), TYPE_PAUSE_MS);
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
      nextStep(() => remove(newPlaceholder), DELETE_SPEED_MS);
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
