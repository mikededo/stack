import { createAppURLParams, type Params } from '@stack/utils';

import { get } from 'svelte/store';

import { goto } from '$app/navigation';
import { page } from '$app/stores';

type DialogType = 'create-key' | 'create-project' | 'delete-key';
type AppURLParams = {
  dialog: DialogType;
  keyId: string;
  multiple: 'false' | 'true';
};
type IsMultiValue = {
  dialog: false;
  keyId: false;
  multiple: false;
};

const MULTI_VALUE_CONFIG: IsMultiValue = {
  dialog: false,
  keyId: false,
  multiple: false
} as const;

export const {
  buildURLParams,
  deleteParam,
  hasParam,
  hasParams
} = createAppURLParams<AppURLParams, IsMultiValue>(MULTI_VALUE_CONFIG);

type Options = {
  pathname?: string;
};

export const gotoWithParams = (
  params: Params<AppURLParams, IsMultiValue>,
  options: Options = {}
): void => {
  const { url } = get(page);
  goto(`${options.pathname ?? url.pathname}?${buildURLParams(url, params)}`);
};

