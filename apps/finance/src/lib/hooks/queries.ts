import type { Client } from '@mstack/svelte-supabase';

import { createQuery } from '@tanstack/svelte-query';

import { Keys } from '$lib/config';
import { getBook, getBooksWithPages, getBookTags, getPage } from '$lib/db';

export const useBooks = (client: Client) =>
  createQuery({
    queryFn: () => getBooksWithPages(client),
    queryKey: Keys.BOOKS
  });

export const useBook = (client: Client, book: string) =>
  createQuery({
    queryFn: () => getBook(client, +book),
    queryKey: Keys.BOOK(book)
  });

export const useBookPages = (client: Client, book: string, page: string) =>
  createQuery({
    queryFn: () => getPage(client, +page),
    queryKey: Keys.PAGE(book, page)
  });

export const useBookTags = (client: Client, book: string) =>
  createQuery({
    queryFn: () => getBookTags(client, +book),
    queryKey: Keys.BOOK_TAGS(book)
  });
