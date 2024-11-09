type BaseURLParams = Record<string, string>;
type BaseMultiValueConfig<TParams extends BaseURLParams> = {
  [K in keyof TParams]: boolean;
};

export type ParamValue<
  TParams extends BaseURLParams,
  TConfig extends BaseMultiValueConfig<TParams>,
  K extends keyof TConfig & keyof TParams
> = TConfig[K] extends true ? TParams[K] | TParams[K][] : TParams[K];

export type Params<
  TParams extends BaseURLParams,
  TConfig extends BaseMultiValueConfig<TParams>
> = Partial<{
  /**
   * Allow undefined to the value in case the param has to be removed
   */
  [K in keyof TConfig & keyof TParams]:
    | ParamValue<TParams, TConfig, K>
    | undefined;
}>;

export type ParamCheck<
  TParams extends BaseURLParams,
  TConfig extends BaseMultiValueConfig<TParams>,
  K extends keyof TConfig & keyof TParams
> = [K, ParamValue<TParams, TConfig, K>];

type BuildURLParamsOptions = {
  separator: string;
  baseParams?: URLSearchParams;
};

/**
 * Builds a URL search parameters string from the given params object.
 * Handles both single values and arrays, joining array values with the specified separator.
 *
 * @returns Formatted URL search parameters string
 *
 * @example
 * ```ts
 * const params = { tags: ['typescript', 'svelte'], page: '1' };
 * buildURLParams(params, { separator: ',' });
 * // "tags=typescript,svelte&page=1"
 * ```
 */
const buildURLParams = <
  TParams extends BaseURLParams,
  TConfig extends BaseMultiValueConfig<TParams>
>(
  params: Params<TParams, TConfig>,
  { baseParams, separator }: BuildURLParamsOptions
): string => {
  const resParams = new URLSearchParams(baseParams);

  Object.entries(params).forEach(([key, val]) => {
    if (val === undefined) {
      resParams.delete(key);
      return;
    }

    if (Array.isArray(val)) {
      const joinedValue = val.join(separator);
      resParams.set(key, joinedValue);
    } else {
      resParams.set(key, val as string);
    }
  });

  return resParams.toString();
};

/**
 * Checks if a URL contains a specific parameter with the expected value.
 * For multi-value parameters, checks if all values are present (when value is an array)
 * or if the single value exists in the parameter list.
 *
 * @returns boolean indicating if the parameter exists with expected value(s)
 *
 * @example
 * ```ts
 * const url = new URL('https://example.com?tags=typescript,svelte');
 * hasParam(url, ['tags', ['typescript', 'svelte']], { tags: true });
 * // true
 * ```
 */
const hasParam = <
  TParams extends BaseURLParams,
  TConfig extends BaseMultiValueConfig<TParams>,
  K extends keyof TConfig & keyof TParams
>(
  url: URL,
  [key, value]: ParamCheck<TParams, TConfig, K>,
  multiValueConfig: TConfig,
  separator: string = ','
): boolean => {
  const paramValue = url.searchParams.get(key as string);

  if (!paramValue) {
    return false;
  }

  if (multiValueConfig[key as keyof TConfig]) {
    const values = paramValue.split(separator);

    if (Array.isArray(value)) {
      return value.every(v => values.includes(v));
    }

    return values.includes(value as string);
  }

  return paramValue === value;
};

/**
 * Same as `hasParam`, but checks multiple parameters at once.
 *
 * @returns boolean indicating if all parameters exist with expected values
 *
 * @example
 * ```ts
 * const url = new URL('https://example.com?tags=ts,js&page=1');
 * hasParams(url, [
 *   ['tags', ['ts', 'js']],
 *   ['page', '1']
 * ], { tags: true, page: false });
 * // true
 * ```
 */
const hasParams = <
  TParams extends BaseURLParams,
  TConfig extends BaseMultiValueConfig<TParams>
>(
  url: URL,
  checks: Array<ParamCheck<TParams, TConfig, keyof TConfig & keyof TParams>>,
  multiValueConfig: TConfig,
  separator: string = ','
): boolean =>
  checks.every(check => hasParam(url, check, multiValueConfig, separator));

type GetParamValuesOptions<
  TParams extends BaseURLParams,
  TConfig extends BaseMultiValueConfig<TParams>
> = {
  multiValueConfig: TConfig;
  separator: string;
};
/**
 * Gets the values for a specific parameter key. Handles both single and
 * multi-value parameters based on configuration.
 *
 * @returns Array of values or undefined if parameter doesn't exist
 *
 * @example
 * ```ts
 * getParamValues(new URL('https://example.com?tags=ts,js'), 'tags');
 * // ['ts', 'js']
 * ```
 */
const getParamValues = <
  TParams extends BaseURLParams,
  TConfig extends BaseMultiValueConfig<TParams>
>(
  url: URL,
  key: keyof TParams,
  { multiValueConfig, separator }: GetParamValuesOptions<TParams, TConfig>
) => {
  const paramValues = url.searchParams.get(key as string);
  if (!paramValues) {
    return undefined;
  }

  if (multiValueConfig[key as keyof TConfig]) {
    return paramValues.split(separator) as ParamValue<
      TParams,
      TConfig,
      keyof TConfig & keyof TParams
    >;
  }

  return paramValues as ParamValue<
    TParams,
    TConfig,
    keyof TConfig & keyof TParams
  >;
};

/**
 * Creates a set of utility functions for managing URL parameters in a SvelteKit application.
 * Provides type-safe functions for building, checking and manipulating URL search parameters.
 *
 * @returns Object containing URL parameter utility functions
 *
 * @example
 * ```ts
 * const { buildURLParams } = createAppURLParams({
 *   tags: true,
 *   page: false
 * });
 * ```
 */
export const createAppURLParams = <
  TParams extends BaseURLParams,
  TConfig extends BaseMultiValueConfig<TParams>
>(
  multiValueConfig: TConfig,
  separator: string = ','
) => ({
  /**
   * Adds a single parameter to current the URL's search params
   *
   * @returns Updated URL search parameters string. Does ONLY include the
   * joined parameters as `string`
   *
   * @example
   * ```ts
   * addParam(new URL('https://example.com'), 'tag', 'typescript');
   * // "tag=typescript"
   * ```
   */
  addParam: (url: URL, key: keyof TParams, value: TParams[keyof TParams]) =>
    buildURLParams(
      { [key]: value },
      { baseParams: url.searchParams, separator }
    ),

  /**
   * Adds multiple parameters to the URL's search params
   *
   * @returns Updated URL search parameters string. Does ONLY include the
   * joined parameters as `string`
   *
   * @example
   * ```ts
   * addParams(new URL('https://example.com'), {
   *   tags: ['typescript', 'svelte'],
   *   page: '1'
   * });
   * // "tags=typescript,svelte&page=1"
   * ```
   */
  addParams: (url: URL, params: Params<TParams, TConfig>) =>
    buildURLParams(params, { baseParams: url.searchParams, separator }),

  // TODO: Rename to buildURLSearchParams
  /**
   * Creates a new URL search parameters string from the given params
   *
   * @returns URL search parameters string
   * @see {@link URLSearchParams.toString}
   *
   * @example
   * ```ts
   * buildURLParams({ tags: ['typescript', 'svelte'] });
   * // "tags=typescript,svelte"
   * ```
   */
  buildURLParams: (params: Params<TParams, TConfig>) =>
    buildURLParams(params, { separator }),

  /**
   * Removes a parameter from the URL's search params.
   *
   * @returns Updated URL search parameters string
   *
   * @example
   * ```ts
   * deleteParam(new URL('https://example.com?tag=typescript'), 'tag');
   * // ""
   * ```
   */
  deleteParam: (url: URL, key: keyof TParams) => {
    const params = new URLSearchParams(url.searchParams.toString());
    params.delete(key as string);
    return params.toString();
  },

  /**
   * Gets the values for a specific parameter key. Handles both single and
   * multi-value parameters based on configuration.
   *
   * @returns Array of values or undefined if parameter doesn't exist
   *
   * @example
   * ```ts
   * getParamValues(new URL('https://example.com?tags=ts,js'), 'tags');
   * // ['ts', 'js']
   * ```
   */
  getParamValues: <K extends keyof TParams>(url: URL, key: K) =>
    getParamValues(url, key as string, { multiValueConfig, separator }),

  /**
   * Checks if a URL contains a specific parameter with expected value.
   *
   * @returns boolean indicating if parameter exists with expected value
   *
   * @example
   * ```ts
   * hasParam(new URL('https://example.com?tags=typescript'), ['tags', 'typescript']);
   * // true
   * hasParam(new URL('https://example.com?tags=typescript'), ['tags', 'svelte']);
   * // false
   * ```
   */
  hasParam: <K extends keyof TParams>(
    url: URL,
    check: ParamCheck<TParams, TConfig, K>
  ) => hasParam(url, check, multiValueConfig, separator),

  /**
   * Checks if multiple parameters exist with their expected values. Params
   * that accept multiple values whill return false if any of the values are
   * not present.
   *
   * @returns boolean indicating if all parameters exist with expected values
   *
   * @example
   * ```ts
   * hasParams(new URL('https://example.com?tags=typescript&page=1'), [
   *   ['tags', 'typescript'],
   *   ['page', '1']
   * ]);
   * // true
   * hasParams(new URL('https://example.com?tags=typescript&page=1'), [
   *   ['tags', 'svelte'],
   *   ['page', '1']
   * ]);
   * // false
   * ```
   */
  hasParams: (
    url: URL,
    checks: Array<ParamCheck<TParams, TConfig, keyof TParams>>
  ) => hasParams(url, checks, multiValueConfig, separator)
});
