import { get } from 'svelte/store';

import { page } from '$app/stores';

type Route = {
  // Private
  app: undefined;
  auth: undefined;
  book: { book: string };
  // Public
  home: undefined;

  page: { book: string; page: string };
  signIn: undefined;
  signUp: undefined;
};

type Routes = keyof Route;

const Paths: Record<Routes, string> = {
  app: '/app',
  auth: '/auth',
  book: '/app/:book',
  home: '/',

  page: '/app/:book/:page',
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up'
};

export const isCurrentPath = (path: string | undefined): boolean => get(page).url.pathname === path;

export const isNestedPath = (path: string | undefined, nested: Routes): boolean =>
  !!path?.startsWith(Paths[nested]);

export function pathTo<T extends Routes>(route: T, params?: Route[T]): string {
  if (params !== undefined) {
    return Object.keys(params).reduce(
      (path, key) => path.replace(`:${key}`, (params as Record<string, string>)[key]),
      Paths[route]
    );
  } else {
    return Paths[route];
  }
}

export const isAuthPath = (path: string | undefined) => path === Paths.auth;
export const isAuthRelated = (path: string | undefined) => path?.startsWith(Paths.auth);
