import { get } from 'svelte/store';

import { page } from '$app/stores';

type Route = {
  app: undefined;
  auth: undefined;
  project: { project: string };
  signIn: undefined;
};

type Routes = keyof Route;

const Paths: Record<Routes, string> = {
  app: '/app',
  auth: '/auth',
  project: '/project/:project',
  signIn: '/auth/sign-in'
};

export const isCurrentPath = (path: string | undefined): boolean => get(page).url.pathname === path;

export const isNestedPath = (path: string | undefined, nested: string): boolean => {
  if (!path) {
    return false;
  }

  if (Object.keys(Paths).includes(nested)) {
    const routePattern = Paths[nested as Routes];
    const regexPattern = new RegExp(`^${routePattern.replace(/:[^/]+/g, '[^/]+')}$`);
    return regexPattern.test(path);
  }

  return false;
};

export const pathTo = <T extends Routes>(route: T, params?: Route[T]): string => {
  if (params !== undefined) {
    return Object.keys(params).reduce(
      (path, key) => path.replace(`:${key}`, (params as Record<string, string>)[key]),
      Paths[route]
    );
  } else {
    return Paths[route];
  }
};

export const isAuthPath = (path: string | undefined) => path === Paths.auth;
export const isAuthRelated = (path: string | undefined) => path?.startsWith(Paths.auth);
