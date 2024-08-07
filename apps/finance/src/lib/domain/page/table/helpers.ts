import type { Expense } from '$lib/db';

export const getNewEntryMatches = (expenses: Expense[], value: string) => {
  if (!expenses.length) {
    return [];
  }

  return expenses.reduce<{ html: string; expense: Expense }[]>((acc, expense) => {
    if (!expense.comment || !value) {
      return acc;
    }

    const match = expense.comment.match(new RegExp(value, 'gi'));
    if (!match) {
      return acc;
    }

    const html = expense.comment
      .split(new RegExp(`(${value})`, 'gi'))
      .reduce(
        (acc, slice, i) =>
          `${acc}${i % 2 === 0 ? slice : `<span class="font-semibold">${slice}</span>`}`,
        ''
      );

    return [...acc, { expense: expense, html }];
  }, []);
};
