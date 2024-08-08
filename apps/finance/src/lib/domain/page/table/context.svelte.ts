import { setContext } from 'svelte';

import type { Page } from '$lib/db';

type PageContextState = {
  saveStatus: 'unsaved' | 'saved' | 'saving' | null;
};
type PageContext = {
  page: Page | null;
  state: PageContextState;
};

const PAGE_CONTEXT_KEY = 'page:table';
let pageState = $state<PageContext>({
  page: null,
  state: {
    saveStatus: null
  }
});

export const initPageContext = () => setContext<PageContext>(PAGE_CONTEXT_KEY, pageState);

export const setContextPage = (page: Page) => {
  pageState.page = page;
};

export const getPageExpenses = () => pageState.page?.expenses ?? [];
