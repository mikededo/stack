import { getContext, setContext } from 'svelte';

type ListState = {
  keywords: string;
  view: 'pages' | 'tags';
  sort?: 'date-asc' | 'date-desc' | 'name-asc' | 'name-desc';
};

let listState = $state<ListState>({
  keywords: '',
  view: 'pages',
  sort: 'date-asc'
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
