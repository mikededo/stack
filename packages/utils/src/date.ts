const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const isLeapYear = (year: number) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

export const isValidDate = (date: string): boolean => {
  const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = date.match(datePattern);

  if (!match) {
    return false; // The date string doesn't match the pattern
  }

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);

  // Check the validity of the month
  if (month < 1 || month > 12) {
    return false;
  }

  // Adjust for leap year
  if (month === 2 && isLeapYear(year)) {
    DAYS_IN_MONTH[1] = 29;
  }

  if (day < 1 || day > DAYS_IN_MONTH[month - 1]) {
    return false;
  }

  return true;
};
