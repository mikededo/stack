import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export const theme: Config['theme'] = {
  container: {
    center: true,
    screens: { xl: '1100px', '2xl': '1360px' }
  },
  extend: {
    fontFamily: {
      sans: ['var(--font-sans)', ...fontFamily.sans],
      mono: ['var(--font-mono)', ...fontFamily.mono]
    },
    borderColor: { DEFAULT: '#dee3e7' },
    colors: {
      background: 'var(--background)',
      foreground: 'var(--foreground)',
      primary: {
        DEFAULT: '#9B7AD8',
        '50': '#F8F9FE',
        '100': '#E7E5FC',
        '200': '#C6C0E9',
        '300': '#AE9DDE',
        '400': '#9B7AD8',
        '500': '#7F58BE',
        '600': '#5F4199',
        '700': '#4A2D7F',
        '800': '#362164',
        '900': '#20144C'
      },
      secondary: {
        50: '#F7FAFC',
        100: '#E3E8EE',
        200: '#C1C9D2',
        300: '#A3ACB9',
        400: '#8792A2',
        500: '#697386',
        600: '#4F566B',
        700: '#3C4257',
        800: '#2A2F45',
        900: '#1A1F36'
        // '50': '#FAFCFC',
        // '100': '#E4E8EE',
        // '200': '#C1C9D0',
        // '300': '#A2ABB7',
        // '400': '#8892A2',
        // '500': '#6B7385',
        // '600': '#505669',
        // '700': '#3C4055',
        // '800': '#2B2E44',
        // '900': '#2B2E44'
      },
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
      }
    }
  },
  borderRadius: {
    DEFAULT: '0.5rem',
    '2xl': '1rem',
    xl: 'calc(0.5rem + 4px)',
    lg: 'calc(0.5rem + 2px)',
    md: 'calc(0.5rem - 2px)',
    sm: 'calc(0.5rem - 4px)',
    full: '9999px'
  }
};

export const typography = () =>
  plugin((api) => {
    const { addBase, theme } = api;
    addBase({
      h1: {
        fontSize: theme('fontSize.4xl'),
        fontWeight: theme('fontWeight.semibold'),
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
