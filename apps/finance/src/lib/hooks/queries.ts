import type { Client } from '@mstack/svelte-supabase';

import { createQuery } from '@tanstack/svelte-query';

import { Keys } from '$lib/config';
import { getBook, getBookTags, getBooksWithPages, getPage } from '$lib/db';

export const useBooks = (client: Client) =>
  createQuery({
    queryKey: Keys.BOOKS,
    queryFn: () => getBooksWithPages(client)
  });

export const useBook = (client: Client, book: string) =>
  createQuery({
    queryKey: Keys.BOOK(book),
    queryFn: () => getBook(client, +book)
  });

export const useBookPages = (client: Client, book: string, page: string) =>
  createQuery({
    queryKey: Keys.PAGE(book, page),
    queryFn: () => getPage(client, +page)
  });

export const useBookTags = (client: Client, book: string) =>
  createQuery({
    queryKey: Keys.BOOK_TAGS(book),
    queryFn: () => getBookTags(client, +book)
  });
