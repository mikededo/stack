import { get } from 'svelte/store';

import { goto } from '$app/navigation';
import { page } from '$app/stores';

// TODO: Rename to create-project
type ProjectDialogParams = 'create-project';
type KeyDialogParams = 'delete-key';
type Params = {
  dialog: KeyDialogParams | ProjectDialogParams;
  multiple: 'false' | 'true';

  // Key specific
  keyId: string;
};
type ParamKeys = keyof Params;

type Options = {
  pathname?: string;
};

export function addParams(params: Partial<Params>, options?: Options): void;
export function addParams<K extends ParamKeys>(params: [K, Params[K]], options?: Options): void;
export function addParams<K extends ParamKeys>(
  params: [K, Params[K]] | Partial<Params>,
  options: Options = {}
): void {
  const { url } = get(page);
  const resParams = new URLSearchParams(url.searchParams.toString());

  if (Array.isArray(params)) {
    const [key, value] = params;
    resParams.set(key, value);
  } else {
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined) {
        resParams.set(key, val);
      }
    });
  }

  goto(`${options.pathname ?? url.pathname}?${resParams.toString()}`);
}

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
