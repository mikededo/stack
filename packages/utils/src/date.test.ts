import { describe, expect, it } from 'vitest';

import { getRelativeTimeText, isValidDate } from './date';

describe('isValidDate', () => {
  it('should return true for a valid date in the correct format', () => {
    expect(isValidDate('15/08/2023')).toBe(true); // Normal date
    expect(isValidDate('29/02/2020')).toBe(true); // Leap year
    expect(isValidDate('31/12/2023')).toBe(true); // End of year
  });

  it('should return false for an invalid date format', () => {
    expect(isValidDate('2023/08/15')).toBe(false); // Wrong format
    expect(isValidDate('15-08-2023')).toBe(false); // Wrong format
    expect(isValidDate('15082023')).toBe(false); // Missing separators
    expect(isValidDate('15/8/2023')).toBe(false); // Missing leading zero
  });

  it('should return false for an invalid day', () => {
    expect(isValidDate('32/01/2023')).toBe(false); // Day out of range
    expect(isValidDate('00/01/2023')).toBe(false); // Day less than 1
  });

  it('should return false for an invalid month', () => {
    expect(isValidDate('15/00/2023')).toBe(false); // Month less than 1
    expect(isValidDate('15/13/2023')).toBe(false); // Month out of range
  });

  it('should return false for an invalid date on a non-leap year', () => {
    expect(isValidDate('29/02/2021')).toBe(false); // Non-leap year
    expect(isValidDate('30/02/2021')).toBe(false); // February has at most 28 or 29 days
  });

  it('should return true for February 29th on a leap year', () => {
    expect(isValidDate('29/02/2020')).toBe(true); // Leap year
    expect(isValidDate('29/02/2000')).toBe(true); // Leap year
    expect(isValidDate('29/02/1600')).toBe(true); // Historical leap year
  });
});

describe('getRelativeTimeText', () => {
  it('should return the correct text for seconds ago', () => {
    const now = new Date();
    const date = new Date(now.getTime() - 30 * 1000); // 30 seconds ago
    expect(getRelativeTimeText(date)).toBe('30 seconds ago');
  });

  it('should return the correct text for 1 minute ago', () => {
    const now = new Date();
    const date = new Date(now.getTime() - 60 * 1000); // 1 minute ago
    expect(getRelativeTimeText(date)).toBe('1 minute ago');
  });

  it('should return the correct text for multiple minutes ago', () => {
    const now = new Date();
    const date = new Date(now.getTime() - 5 * 60 * 1000); // 5 minutes ago
    expect(getRelativeTimeText(date)).toBe('5 minutes ago');
  });

  it('should return the correct text for 1 hour ago', () => {
    const now = new Date();
    const date = new Date(now.getTime() - 60 * 60 * 1000); // 1 hour ago
    expect(getRelativeTimeText(date)).toBe('1 hour ago');
  });

  it('should return the correct text for multiple hours ago', () => {
    const now = new Date();
    const date = new Date(now.getTime() - 3 * 60 * 60 * 1000); // 3 hours ago
    expect(getRelativeTimeText(date)).toBe('3 hours ago');
  });

  it('should return the correct text for 1 day ago', () => {
    const now = new Date();
    const date = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 1 day ago
    expect(getRelativeTimeText(date)).toBe('1 day ago');
  });

  it('should return the correct text for multiple days ago', () => {
    const now = new Date();
    const date = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000); // 5 days ago
    expect(getRelativeTimeText(date)).toBe('5 days ago');
  });

  it('should return the correct text for 1 week ago', () => {
    const now = new Date();
    const date = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 1 week ago
    expect(getRelativeTimeText(date)).toBe('1 week ago');
  });

  it('should return the correct text for multiple weeks ago', () => {
    const now = new Date();
    const date = new Date(now.getTime() - 3 * 7 * 24 * 60 * 60 * 1000); // 3 weeks ago
    expect(getRelativeTimeText(date)).toBe('3 weeks ago');
  });
});
