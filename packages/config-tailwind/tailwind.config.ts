import type { Config } from 'tailwindcss';

import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const { fontFamily } = defaultTheme;

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
    fontFamily: {
      mono: ['var(--font-mono)', ...fontFamily.mono],
      sans: ['var(--font-sans)', ...fontFamily.sans]
    }
  }
};

// eslint-disable-next-line ts/no-require-imports
export const scrollbars = () => require('tailwind-scrollbar');

export const typography = (): ReturnType<typeof plugin> =>
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

