import type { Config } from 'tailwindcss';

import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export * from './aria';

export const theme: Config['theme'] = {
  borderRadius: {
    '2xl': '1rem',
    DEFAULT: '0.5rem',
    full: '9999px',
    lg: 'calc(0.5rem + 2px)',
    md: 'calc(0.5rem - 2px)',
    none: '0',
    sm: 'calc(0.5rem - 4px)',
    xl: 'calc(0.5rem + 4px)'
  },
  container: {
    center: true,
    screens: { '2xl': '1360px', xl: '1100px' }
  },
  extend: {
    borderColor: { DEFAULT: '#dee3e7' },
    colors: {
      background: 'var(--background)',
      destructive: {
        100: '#fbd3dc',
        200: '#faa9b8',
        300: '#fa7e91',
        400: '#fa4a67',
        50: '#fde9ee',
        500: '#e61947',
        600: '#c0123c',
        700: '#9b0c36',
        800: '#76072f',
        900: '#4e0322'
      },
      foreground: 'var(--foreground)',
      info: {
        100: '#CFF3FB',
        200: '#8ED8E9',
        300: '#62BDE4',
        400: '#4D9DCE',
        50: '#EEFDFE',
        500: '#277FB5',
        600: '#1C5B92',
        700: '#154876',
        800: '#0F3451',
        900: '#082530'
      },
      orange: {
        100: '#fbd992',
        200: '#fcaf4f',
        300: '#f7870f',
        400: '#e46602',
        50: '#fceeb5',
        500: '#cc4b00',
        600: '#b13600',
        700: '#922700',
        800: '#701b01',
        900: '#4a0f02'
      },
      positive: {
        100: '#CFF7C9',
        200: '#91E396',
        300: '#52D080',
        400: '#3EB574',
        50: '#F2FEEE',
        500: '#288D60',
        600: '#216B44',
        700: '#18533A',
        800: '#113B34',
        900: '#0A2627'
      },
      primary: {
        100: '#dfe7fa',
        200: '#c7d6f6',
        300: '#a0bcf0',
        400: '#648de5',
        50: '#f1f4fd',
        500: '#5275df',
        600: '#3d58d3',
        700: '#3447c1',
        800: '#2f3b9e',
        900: '#2b357d',
        DEFAULT: '#5275df'
      },
      secondary: {
        100: '#fff3c6',
        200: '#ffe888',
        300: '#fed54b',
        400: '#fec735',
        50: '#fffbeb',
        500: '#f8a008',
        600: '#dc7803',
        700: '#b65407',
        800: '#94410c',
        900: '#79360e'
      },
      surface: {
        100: '#f0f0f0',
        200: '#e3e3e3',
        300: '#d1d1d1',
        400: '#bfbfbf',
        50: '#f7f7f7',
        500: '#aaaaaa',
        600: '#969696',
        700: '#818181',
        800: '#6a6a6a',
        900: '#585858'
      }
    },
    fontFamily: {
      mono: ['var(--font-mono)', ...fontFamily.mono],
      sans: ['var(--font-sans)', ...fontFamily.sans]
    }
  }
};

// eslint-disable-next-line ts/no-require-imports
export const scrollbars = () => require('tailwind-scrollbar');

export const typography = () =>
  plugin((api) => {
    const { addBase, theme } = api;

    addBase({
      h1: {
        fontSize: theme('fontSize.4xl'),
        fontWeight: theme('fontWeight.bold'),
        lineHeight: theme('lineHeight.tight')
      },
      h2: {
        fontSize: theme('fontSize.3xl'),
        fontWeight: theme('fontWeight.semibold'),
        lineHeight: theme('lineHeight.tight')
      },
      h3: {
        fontSize: theme('fontSize.2xl'),
        fontWeight: theme('fontWeight.semibold'),
        lineHeight: theme('lineHeight.tight')
      },
      h4: {
        fontSize: theme('fontSize.xl'),
        fontWeight: theme('fontWeight.semibold'),
        lineHeight: theme('lineHeight.tight')
      },
      h5: {
        fontSize: theme('fontSize.lg'),
        fontWeight: theme('fontWeight.semibold'),
        lineHeight: theme('lineHeight.tight')
      },
      h6: {
        fontSize: theme('fontSize.base'),
        fontWeight: theme('fontWeight.semibold'),
        lineHeight: theme('lineHeight.tight')
      }
    });
  });

