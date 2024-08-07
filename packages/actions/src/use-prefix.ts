import type { Action, ActionReturn } from 'svelte/action';

export const usePrefix: Action<HTMLInputElement, string> = (
  node: HTMLInputElement,
  prefix: string
): ActionReturn<string> => {
  const onInput = () => {
    if (!node.value.startsWith(prefix)) {
      node.value = prefix + node.value;
    }
  };

  node.addEventListener('input', onInput, true);
  onInput();

  return {
    destroy() {
      node.removeEventListener('input', onInput, true);
    }
  };
};
