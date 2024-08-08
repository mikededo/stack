import { setContext } from 'svelte';

import type { Page } from '$lib/db';

type PageContextState = {
  saveStatus: 'saved' | 'saving' | 'unsaved' | null;
};
type PageContext = {
  page: null | Page;
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

// Loading handlers
export const onInitLoading = () => {
  pageState.state.saveStatus = 'saving';
};
export const onStopLoading = () => {
  pageState.state.saveStatus = 'saved';
  setTimeout(() => {
    pageState.state.saveStatus = null;
  }, 2500);
};

export const getPageBookId = () => pageState.page?.book_id;
export const getPageId = () => pageState.page?.id;
export const getPageExpenses = () => pageState.page?.expenses ?? [];
