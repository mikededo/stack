import { isValidDate } from '@stack/utils';

import type { Expense } from '$lib/db';

export const parseDate = (date?: null | string) => {
  if (!date) {
    return '';
  }

  // Check if date is already in the correct format
  if (isValidDate(date)) {
    return date;
  }

  const [year, month, day] = date.split('-');
  if (!day || !month || !year) {
    throw new Error(`Invalid date format: ${date}`);
  }

  return `${day}/${month}/${year}`;
};

export const parseAmount = (amount?: null | string) => {
  if (!amount) {
    return '';
  }

  return amount.startsWith('€ ') ? amount.slice(2) : amount;
};

export const getNewEntryMatches = (expenses: Expense[], value: string) => {
  if (!expenses.length) {
    return [];
  }

  const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const result = expenses.reduce<Map<string, { expense: Expense; html: string }>>(
    (acc, expense) => {
      if (!expense.comment || !value) {
        return acc;
      }

      const match = expense.comment.match(new RegExp(escapedValue, 'gi'));
      if (!match) {
        return acc;
      }

      const html = expense.comment
        .split(new RegExp(`(${escapedValue})`, 'gi'))
        .reduce(
          (acc, slice, i) =>
            `${acc}${i % 2 === 0 ? slice : `<span class="font-semibold">${slice}</span>`}`,
          ''
        );

      acc.set(expense.comment, { expense, html });
      return acc;
    },
    new Map()
  );
  return [...result.values()];
};

export type ExpenseValidation = { amount: string; comment: string; date: string };
export const isExpenseValid = ({ amount, comment, date }: ExpenseValidation) => {
  return Boolean(comment && isValidDate(date) && Number(parseAmount(amount)) >= 0);
};

export const hasExpenseChanged = (expense: Expense, newExpense: ExpenseValidation) => {
  // Ensure dates are in the same format
  if (parseDate(expense.date) !== parseDate(newExpense.date)) {
    return true;
  }

  if (expense.amount !== Number(parseAmount(newExpense.amount))) {
    return true;
  }

  return expense.comment !== newExpense.comment;
};
