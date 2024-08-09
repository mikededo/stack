import type { Config } from 'tailwindcss';

import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export const theme: Config['theme'] = {
  borderRadius: {
    '2xl': '1rem',
    DEFAULT: '0.5rem',
    full: '9999px',
    lg: 'calc(0.5rem + 2px)',
    md: 'calc(0.5rem - 2px)',
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
        50: '#fde9ee',
        100: '#fbd3dc',
        200: '#faa9b8',
        300: '#fa7e91',
        400: '#fa4a67',
        500: '#e61947',
        600: '#c0123c',
        700: '#9b0c36',
        800: '#76072f',
        900: '#4e0322'
      },
      foreground: 'var(--foreground)',
      info: {
        '50': '#EEFDFE',
        '100': '#CFF3FB',
        '200': '#8ED8E9',
        '300': '#62BDE4',
        '400': '#4D9DCE',
        '500': '#277FB5',
        '600': '#1C5B92',
        '700': '#154876',
        '800': '#0F3451',
        '900': '#082530'
      },
      orange: {
        50: '#fceeb5',
        100: '#fbd992',
        200: '#fcaf4f',
        300: '#f7870f',
        400: '#e46602',
        500: '#cc4b00',
        600: '#b13600',
        700: '#922700',
        800: '#701b01',
        900: '#4a0f02'
      },
      positive: {
        '50': '#F2FEEE',
        '100': '#CFF7C9',
        '200': '#91E396',
        '300': '#52D080',
        '400': '#3EB574',
        '500': '#288D60',
        '600': '#216B44',
        '700': '#18533A',
        '800': '#113B34',
        '900': '#0A2627'
      },
      primary: {
        '50': '#F8F9FE',
        '100': '#E7E5FC',
        '200': '#C6C0E9',
        '300': '#AE9DDE',
        '400': '#9B7AD8',
        '500': '#7F58BE',
        '600': '#5F4199',
        '700': '#4A2D7F',
        '800': '#362164',
        '900': '#20144C',
        DEFAULT: '#7F58BE'
      },
      secondary: {
        50: '#FAFAF9',
        100: '#F6F6F4', // Base color
        200: '#EDEDEA',
        300: '#DCDCD8',
        400: '#C4C4BE',
        500: '#A7A7A0',
        600: '#8B8B83',
        700: '#6F6F67',
        800: '#53534B',
        900: '#373733'
      }
    },
    fontFamily: {
      mono: ['var(--font-mono)', ...fontFamily.mono],
      sans: ['var(--font-sans)', ...fontFamily.sans]
    }
  }
};

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
