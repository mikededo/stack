const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const isLeapYear = (year: number) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

export const isValidDate = (date: string): boolean => {
  const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = date.match(datePattern);

  if (!match) {
    return false; // The date string doesn't match the pattern
  }

  const day = Number.parseInt(match[1], 10);
  const month = Number.parseInt(match[2], 10);
  const year = Number.parseInt(match[3], 10);

  // Check the validity of the month
  if (month < 1 || month > 12) {
    return false;
  }

  // Get the number of days in the month, considering leap years
  const daysInMonth
    = month === 2 && isLeapYear(year) ? 29 : DAYS_IN_MONTH[month - 1];

  // Check the validity of the day
  if (day < 1 || day > daysInMonth) {
    return false;
  }

  return true;
};

export const isMoreThanAMinuteAgo = (now: Date, date: Date) =>
  now.getTime() - date.getTime() > 1000 * 60 - 1;

export const isMoreThanAnHourAgo = (now: Date, date: Date) =>
  now.getTime() - date.getTime() > 1000 * 60 * 60 - 1;

export const isMoreThanADayAgo = (now: Date, date: Date) =>
  now.getTime() - date.getTime() > 1000 * 60 * 60 * 24 - 1;

export const isMoreThanAWeekAgo = (now: Date, date: Date) =>
  now.getTime() - date.getTime() > 1000 * 60 * 60 * 24 * 7 - 1;

export const getRelativeTimeText = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  if (isMoreThanAWeekAgo(now, date)) {
    const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    return weeks === 1 ? `${weeks} week ago` : `${weeks} weeks ago`;
  }

  if (isMoreThanADayAgo(now, date)) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days === 1 ? `${days} day ago` : `${days} days ago`;
  }

  if (isMoreThanAnHourAgo(now, date)) {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
  }

  if (isMoreThanAMinuteAgo(now, date)) {
    const minutes = Math.floor(diff / 1000 / 60);
    return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
  }

  return `${Math.floor(diff / 1000)} seconds ago`;
};
