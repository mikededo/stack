export const Keys = {
  USER: ['user'],
  BOOKS: ['books'],
  BOOK: (book: string) => ['books', book],
  PAGE: (book: string, page: string) => ['books', book, 'page', page]
};
