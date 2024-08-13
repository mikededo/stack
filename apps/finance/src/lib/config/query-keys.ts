export const Keys = {
  BOOK: (book: string) => ['books', book],
  BOOK_TAGS: (book: string) => ['books', book, 'tags'],
  BOOKS: ['books'],
  PAGE: (book: string, page: string) => ['books', book, 'page', page],
  PINNED_PAGES: ['pinned-pages'],
  USER: ['user']
};
