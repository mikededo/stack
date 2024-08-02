export const Keys = {
  USER: ['user'],
  BOOKS: ['books'],
  BOOK: (book: string) => ['books', book],
  BOOK_TAGS: (book: string) => ['books', book, 'tags'],
  PAGE: (book: string, page: string) => ['books', book, 'page', page]
};
