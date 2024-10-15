import type { Config } from 'tailwindcss';

import { aria, scrollbars, theme } from '@stack/tailwind-config';

export default {
  content: ['./src/**/*.svelte', './src/**/*.ts'],
  darkMode: 'class',
  plugins: [scrollbars(), aria()],
  prefix: 'l-',
  presets: [{ theme }],
  theme: {
    container: {
      center: true,
      screens: { '2xl': '1360px', xl: '1100px' }
    },
    extend: {
      height: ({ theme }) => ({
        content: `calc(100vh - ${theme('spacing.12')})`,
        'content-nav': `calc(100vh - ${theme('spacing.24')})`,
        'top-bar': theme('spacing.12')
      }),
      width: {
        'content-md': 'calc(100vw - 290px)'
      }
    }
  }
} satisfies Config;
