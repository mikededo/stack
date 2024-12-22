export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const hexToRgb = (hex: string): string => {
  const bigint = Number.parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
};
