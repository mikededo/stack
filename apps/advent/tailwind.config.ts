import type { Config } from 'tailwindcss';

import { themeColors } from '@stack/tailwind-config';

import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  plugins: [typography],
  theme: {
    extend: {
      colors: themeColors,
      container: {
        center: true,
        screens: { '2xl': '1100px', xl: '1100px' }
      }
    },
    fontFamily: {
      mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
      sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans]
    }
  }
} satisfies Config;
