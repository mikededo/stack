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
  [K in keyof TConfig & keyof TParams]: ParamValue<TParams, TConfig, K> | undefined;
}>;

export type ParamCheck<
  TParams extends BaseURLParams,
  TConfig extends BaseMultiValueConfig<TParams>,
  K extends keyof TConfig & keyof TParams
> = [K, ParamValue<TParams, TConfig, K>];

const buildURLParams = <
  TParams extends BaseURLParams,
  TConfig extends BaseMultiValueConfig<TParams>
>(
  url: URL,
  params: Params<TParams, TConfig>,
  separator: string = ','
): string => {
  const resParams = new URLSearchParams(url.searchParams.toString());

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

const hasParams = <
  TParams extends BaseURLParams,
  TConfig extends BaseMultiValueConfig<TParams>
>(
  url: URL,
  checks: Array<ParamCheck<TParams, TConfig, keyof TConfig & keyof TParams>>,
  multiValueConfig: TConfig,
  separator: string = ','
): boolean =>
  checks.every(check =>
    hasParam(url, check, multiValueConfig, separator)
  );

export const createAppURLParams = <
  TParams extends BaseURLParams,
  TConfig extends BaseMultiValueConfig<TParams>
>(
  multiValueConfig: TConfig,
  separator: string = ','
) => ({
  buildURLParams: (url: URL, params: Params<TParams, TConfig>) =>
    buildURLParams(url, params, separator),

  deleteParam: (
    url: URL,
    key: keyof TParams
  ) => {
    const params = new URLSearchParams(url.searchParams.toString());
    params.delete(key as string);
    return params.toString();
  },

  hasParam: <K extends keyof TParams>(
    url: URL,
    check: ParamCheck<TParams, TConfig, K>
  ) => hasParam(url, check, multiValueConfig, separator),

  hasParams: (
    url: URL,
    checks: Array<ParamCheck<TParams, TConfig, keyof TParams>>
  ) => hasParams(url, checks, multiValueConfig, separator)
});
