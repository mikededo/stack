/* eslint-disable perfectionist/sort-objects */

type SolvedVisualization = {
  href: string;
  title: string;
  description: string;
  // TODO: add tags
};
type Days = [never, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
type Year = {
  [K in Exclude<keyof Days, '0' | keyof []>]: null | SolvedVisualization;
};

export const SOLUTIONS: Record<number, Year> = {
  2024: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null,
    12: {
      href: '/2024/12',
      title: '12th',
      description: 'Implementation of a <em>&ldquo;flood fill&rdquo;</em> algorithm to dectect consequent areas.'
    },
    13: null,
    14: null,
    15: {
      href: '/2024/15',
      title: '15th',
      description: 'Analyze the robot\'s actions while accounting for obstacles and blocked movements on a map.'
    },
    16: null,
    17: null,
    18: null,
    19: null,
    20: null,
    21: null,
    22: null,
    23: null,
    24: null,
    25: null
  }
};
