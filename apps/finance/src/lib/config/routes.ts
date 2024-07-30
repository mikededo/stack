import { get } from 'svelte/store';

import { page } from '$app/stores';

type Route = {
  // Public
  home: undefined;
  auth: undefined;
  signIn: undefined;
  signUp: undefined;

  // Private
  app: undefined;
  book: { book: string };
  page: { book: string; page: string };
};

type Routes = keyof Route;

const Paths: Record<Routes, string> = {
  home: '/',
  auth: '/auth',
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',

  app: '/app',
  book: '/app/:book',
  page: '/app/:book/:page'
};

export const isCurrentPath = (path: string | undefined): boolean => get(page).url.pathname === path;

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
