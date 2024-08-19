import { getContext, setContext } from 'svelte';

export type ListState = {
  keywords: string;
  sort?: 'date-asc' | 'date-desc' | 'name-asc' | 'name-desc';
  view: 'pages' | 'tags';
};

let listState = $state<ListState>({
  keywords: '',
  sort: 'date-asc',
  view: 'pages'
});

const CONTEXT_KEY = 'page-list';
export const initListContext = () => setContext(CONTEXT_KEY, listState);

export const getListContext = () => {
  const context = getContext<ListState>(CONTEXT_KEY);
  if (!context) {
    throw new Error(
      'Unable to find page list context on the tree. Make sure to use `initListContext` on the root component.'
    );
  }

  return context;
};
