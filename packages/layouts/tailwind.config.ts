import type { Config } from 'tailwindcss';

import { scrollbars, theme } from '@stack/tailwind-config';

export default {
  content: ['./src/**/*.svelte', './src/**/*.ts'],
  darkMode: 'class',
  plugins: [scrollbars()],
  prefix: 'l-',
  presets: [{ theme }],
  theme: {
    extend: {
      height: ({ theme }) => ({
        content: `calc(100vh - ${theme('spacing.12')})`,
        'top-bar': theme('spacing.12')
      }),
      width: {
        'content-md': 'calc(100vw - 290px)'
      }
    }
  }
} satisfies Config;
