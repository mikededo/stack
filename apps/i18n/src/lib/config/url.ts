import { get } from 'svelte/store';

import { goto } from '$app/navigation';
import { page } from '$app/stores';

type ProjectDialogParams = 'createProject';
type Params = {
  dialog: ProjectDialogParams;
};
type ParamKeys = keyof Params;

type Options = {
  pathname?: string;
};

export const appendParam = <K extends ParamKeys>(key: K, value: Params[K]) => {
  const { url } = get(page);
  const params = new URLSearchParams(url.searchParams.toString());
  params.set(key, value);
  goto(`${url.pathname}?${params.toString()}`);
};

export const deleteParam = (key: ParamKeys, { pathname }: Options = {}) => {
  const { url } = get(page);
  const params = new URLSearchParams(url.searchParams.toString());
  params.delete(key);
  goto(`${pathname ?? url.pathname}?${params.toString()}`);
};

/**
 * Simple function that allows us to check for typesafe params
 */
export const containsParam = <K extends ParamKeys>(params: URLSearchParams, key: K, value: Params[K]) => params.get(key) === value;
