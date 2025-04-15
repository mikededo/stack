export * from './canvas';
export * from './colors';
export * from './types';

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

