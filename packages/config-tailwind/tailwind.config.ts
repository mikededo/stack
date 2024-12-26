import type { Config } from 'tailwindcss';
import type { ThemeConfig } from 'tailwindcss/types/config';

import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export * from './aria';

export const themeColors: ThemeConfig['colors'] = {
  background: 'var(--background)',
  destructive: {
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a'
  },
  foreground: 'var(--foreground)',
  info: {
    100: '#a9c0ff',
    200: '#84a6ff',
    300: '#5f8bff',
    400: '#3a71ff',
    50: '#cedaff',
    500: '#245af1',
    600: '#1b45d5',
    700: '#1230b9',
    800: '#091b9c',
    900: '#000780'
  },
  positive: {
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16'
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
  },
  warning: {
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    50: '#fff7ed',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407'
  }
};

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
    colors: themeColors,
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

