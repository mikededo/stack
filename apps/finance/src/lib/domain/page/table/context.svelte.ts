import type { Page as PageStore } from '@sveltejs/kit';

import { getContext, setContext } from 'svelte';
import { get } from 'svelte/store';

import type { Page } from '$lib/db';

import { goto } from '$app/navigation';
import { page } from '$app/stores';

export type Sort = 'amount-asc' | 'amount-desc' | 'date-asc' | 'date-desc';
type SaveStatus = 'saved' | 'saving' | 'unsaved' | null;
type PageContextFilters = {
  sort: Sort;
  tags: Set<number>;
};
type PageContext = {
  filters: PageContextFilters;
  page: null | Page;
  saveStatus: SaveStatus;
};

const TAGS_KEY = 'tags';
const TAGS_KEY_SEPARATOR = ',';
const SORT_KEY = 'sort';
const VALID_SORTS: Sort[] = ['amount-asc', 'amount-desc', 'date-asc', 'date-desc'];

const isValidSort = (sort: null | string): sort is Sort => VALID_SORTS.includes(sort as Sort);

const PAGE_CONTEXT_KEY = 'page:table';
let pageState = $state<PageContext>({
  filters: {
    sort: 'date-asc',
    tags: new Set()
  },
  page: null,
  saveStatus: null
});

export const initPageContext = () => {
  page.subscribe((page: PageStore) => {
    // By subscribing to the page store, we ensure that the state will be update
    // on any page change (i.e. query parameters change)
    const params = new URLSearchParams(page.url.searchParams);
    const tags = new Set(
      (params.get(TAGS_KEY) ?? '').split(TAGS_KEY_SEPARATOR).filter(Boolean).map(Number)
    );
    const sort = params.get(SORT_KEY);

    pageState.filters = {
      sort: isValidSort(sort) ? sort : 'date-asc',
      tags: tags
    };
  });

  return setContext<PageContext>(PAGE_CONTEXT_KEY, pageState);
};

export const getPageContext = () => {
  const context = getContext<PageContext>(PAGE_CONTEXT_KEY);
  if (!context) {
    throw new Error(
      'Unable to find page table context on the tree. Make sure to use `initPageContext` on the root component.'
    );
  }

  return context;
};

export const setContextPage = (page: Page) => {
  pageState.page = page;
};

// HELPERS
const throwIfUndefined = <T>(value: T | undefined, message = 'Value is undefined'): T => {
  if (value === undefined) {
    throw new Error(message);
  }
  return value;
};

export const updateURL = (path: string) => goto(path, { keepFocus: true });

export const getPageBookId = () => throwIfUndefined(pageState.page?.book_id);
export const getPageId = () => throwIfUndefined(pageState.page?.id);
export const getPageExpenses = () => pageState.page?.expenses ?? [];

export const isTagActive = (tag: number) => pageState.filters.tags.has(tag);
export const areTagsActive = () => pageState.filters.tags.size > 0;
export const isSortActive = (sort: Sort) => pageState.filters.sort === sort;

export const clearPageFilters = () => {
  const params = new URLSearchParams(get(page).url.searchParams);
  params.delete('sort');
  params.delete('tags');

  updateURL(`${get(page).url.pathname}?${params.toString()}`);
};

// MODIFIERS

export const onInitLoading = () => {
  pageState.saveStatus = 'saving';
};

export const onStopLoading = () => {
  pageState.saveStatus = 'saved';
  setTimeout(() => {
    pageState.saveStatus = null;
  }, 2500);
};

export const onToggleTag = (tag: number) => {
  const _page = get(page);
  const params = new URLSearchParams(_page.url.searchParams);
  const updatedTags = new Set([...pageState.filters.tags.values()]);

  if (updatedTags.has(tag)) {
    updatedTags.delete(tag);
  } else {
    updatedTags.add(tag);
  }

  if (updatedTags.size === 0) {
    params.delete(TAGS_KEY);
  } else {
    params.set(TAGS_KEY, [...updatedTags].join(','));
  }
  updateURL(`${_page.url.pathname}?${params.toString()}`);
};

export const onClickSort = (sort: Sort) => {
  const _page = get(page);
  const params = new URLSearchParams(_page.url.searchParams);

  params.set(SORT_KEY, sort);
  updateURL(`${_page.url.pathname}?${params.toString()}`);
};
