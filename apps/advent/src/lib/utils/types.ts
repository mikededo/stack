export type Tag = 'Algorithm';
export type SolvedVisualization = {
  href: string;
  tags: Tag[];
  title: string;
  description: string;
};
export type Days = [never, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
export type Year = Partial<{
  [K in Exclude<keyof Days, '0' | keyof []>]: SolvedVisualization;
}>;
