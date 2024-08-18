import { get } from 'svelte/store';

import { goto } from '$app/navigation';
import { page } from '$app/stores';

const DIALOG_KEY = 'dialog';
const DIALOG_TYPES = {
  CREATE_BOOK: 'create-book'
};

export const showDialog = (type: keyof typeof DIALOG_TYPES) => {
  const url = get(page).url;
  const params = new URLSearchParams(url.search);
  params.set(DIALOG_KEY, DIALOG_TYPES[type]);

  goto(`${url.pathname}?${params.toString()}`, { keepFocus: true, replaceState: false });
};

export const hideDialog = () => {
  const url = get(page).url;
  const params = new URLSearchParams(url.search);
  params.delete(DIALOG_KEY);

  goto(`${url.pathname}?${params.toString()}`, { keepFocus: true, replaceState: false });
};
