import { isValidDate } from '@mstack/utils';

import type { Expense } from '$lib/db';

export const getNewEntryMatches = (expenses: Expense[], value: string) => {
  if (!expenses.length) {
    return [];
  }

  return expenses.reduce<{ expense: Expense; html: string }[]>((acc, expense) => {
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

type ExpenseValidation = { amount: string; comment: string; date: string };
export const isExpenseValid = ({ amount, comment, date }: ExpenseValidation) =>
  Boolean(comment && isValidDate(date) && amount && Number(amount) >= 0);

export const hasExpenseChanged = (expense: Expense, newExpense: ExpenseValidation) =>
  expense.date !== newExpense.date ||
  expense.amount !== Number(newExpense.amount) ||
  expense.comment !== newExpense.comment;
