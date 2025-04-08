/* eslint-disable perfectionist/sort-objects */

type SolvedVisualization = {
  href: string;
  title: string;
  description: string;
  // TODO: add tags
};
// a => part a, b => part b
type Visualization = [a: boolean, b: boolean];
type Days = [never, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
type Year = {
  [K in Exclude<keyof Days, '0' | keyof []>]: SolvedVisualization | Visualization;
};

export const SOLUTIONS: Record<number, Year> = {
  2024: {
    1: [true, true],
    2: [true, true],
    3: [true, true],
    4: [true, true],
    5: [true, true],
    6: [true, true],
    7: [true, true],
    8: [true, true],
    9: [true, true],
    10: [true, true],
    11: [true, true],
    12: {
      href: '/2024/12',
      title: '12th',
      description: 'Implementation of a <em>&ldquo;flood fill&rdquo;</em> algorithm to dectect consequent areas.'
    },
    13: [true, true],
    14: [true, true],
    15: {
      href: '/2024/15',
      title: '15th',
      description: 'Analyze the robot\'s actions while accounting for obstacles and blocked movements on a map.'
    },
    16: [true, true],
    17: [true, true],
    18: [true, true],
    19: [true, true],
    20: [true, true],
    21: [true, true],
    22: [true, true],
    23: [true, true],
    24: [true, true],
    25: [true, true]
  }
};
