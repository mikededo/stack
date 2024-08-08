// This is a modified version of hperrin/svelte-material-ui
// Copyright 2020-present Hunter Perrin
type SvelteActionReturnType<P> = {
  destroy?: () => void;
  update?: (newParams?: P) => void;
} | void;
type SvelteHTMLActionType<P> = (node: HTMLElement, params?: P) => SvelteActionReturnType<P>;
type HTMLActionEntry<P extends any = any> = [SvelteHTMLActionType<P>, P] | SvelteHTMLActionType<P>;
export type ActionArray = HTMLActionEntry[];

export function useActions(node: HTMLElement, actions: ActionArray) {
  let actionReturns: SvelteActionReturnType<any>[] = [];

  if (actions) {
    for (let i = 0; i < actions.length; i++) {
      const actionEntry = actions[i];
      const action = Array.isArray(actionEntry) ? actionEntry[0] : actionEntry;
      if (Array.isArray(actionEntry) && actionEntry.length > 1) {
        actionReturns.push(action(node as HTMLElement, actionEntry[1]));
      } else {
        actionReturns.push(action(node as HTMLElement));
      }
    }
  }

  return {
    destroy() {
      for (let i = 0; i < actionReturns.length; i++) {
        const returnEntry = actionReturns[i];
        if (returnEntry && returnEntry.destroy) {
          returnEntry.destroy();
        }
      }
    },

    update(actions: ActionArray) {
      if (((actions && actions.length) || 0) != actionReturns.length) {
        throw new Error('You must not change the length of an actions array.');
      }

      if (actions) {
        for (let i = 0; i < actions.length; i++) {
          const returnEntry = actionReturns[i];
          if (returnEntry && returnEntry.update) {
            const actionEntry = actions[i];
            if (Array.isArray(actionEntry) && actionEntry.length > 1) {
              returnEntry.update(actionEntry[1]);
            } else {
              returnEntry.update();
            }
          }
        }
      }
    }
  };
}
