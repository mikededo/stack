import type { Params } from '@stack/utils';

import { createAppURLParams } from '@stack/utils';

import { get } from 'svelte/store';

import { goto } from '$app/navigation';
import { page } from '$app/stores';

type DialogType = 'create-key' | 'create-project' | 'delete-key';
type AppURLSearchParams = {
  keyId: string;
  multiple: 'false' | 'true';
  dialog: DialogType;
};
type IsMultiValue = {
  keyId: false;
  multiple: false;
  dialog: false;
};

const MULTI_VALUE_CONFIG: IsMultiValue = {
  dialog: false,
  keyId: false,
  multiple: false
} as const;

export const {
  buildURLParams,
  deleteParam,
  getParamValues,
  hasParam,
  hasParams
} = createAppURLParams<AppURLSearchParams, IsMultiValue>(MULTI_VALUE_CONFIG);

type GoToOptions = { pathname?: string };
export const gotoWithParams = (
  params: Params<AppURLSearchParams, IsMultiValue>,
  options: GoToOptions = {}
): void => {
  const { url } = get(page);
  goto(`${options.pathname ?? url.pathname}?${buildURLParams(params)}`);
};

