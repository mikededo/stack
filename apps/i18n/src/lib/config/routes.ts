import { page } from '$app/stores';
import { get } from 'svelte/store';

import { buildURLParams } from './url';

// TODO: Extract into package
type JoinIfDefined<T extends object, U extends object | undefined> = U extends undefined ? T : T & U;
type ExtractURLParams<T extends string> = T extends `${string}:${infer Param}/${infer Rest}`
  ? JoinIfDefined<{ [K in Param]: string }, ExtractURLParams<Rest>>
  : T extends `${string}:${infer Param}`
    ? { [K in Param]: string } : undefined;

type ParamExtractor<T extends Record<string, string>> = {
  [K in keyof T]: ExtractURLParams<T[K]>
};
type Route = ParamExtractor<typeof Paths>;
type Routes = keyof Route;

const Paths = {
  app: '/app',
  auth: '/auth',
  editor: '/app/project/:project/editor',
  project: '/app/project/:project',
  signIn: '/auth/sign-in'
} as const;

export const isCurrentPath = (path: string | undefined): boolean => get(page).url.pathname === path;

export const isNestedPath = (path: string | undefined, nested: string): boolean => {
  if (!path) {
    return false;
  }

  if (Object.keys(Paths).includes(nested)) {
    const routePattern = Paths[nested as Routes];
    const regexPattern = new RegExp(`^ ${routePattern.replace(/:[^/]+/g, '[^/]+')} $`);
    return regexPattern.test(path);
  }

  return false;
};

export const pathTo = <T extends Routes>(
  route: T,
  params?: Route[T],
  queryParams?: Parameters<typeof buildURLParams>[0]
): string => {
  const extraParms = buildURLParams(queryParams ?? {});
  if (params === undefined) {
    return `${Paths[route]}?${extraParms}`;
  }

  const url = Object.keys(params).reduce(
    (path, key) => path.replace(`:${key}`, (params as Record<string, string>)[key]),
    Paths[route]
  );
  return `${url}?${extraParms}`;
};

export const isAuthPath = (path: string | undefined) => path === Paths.auth;
export const isAuthRelated = (path: string | undefined) => path?.startsWith(Paths.auth);
export const isHomePath = (path: string | undefined) => path === Paths.app;
