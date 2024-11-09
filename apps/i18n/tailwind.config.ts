import type { Config } from 'tailwindcss';

import { aria, scrollbars, theme, typography } from '@stack/tailwind-config';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  plugins: [aria(), typography(), scrollbars()],
  presets: [{ theme }],
  theme: {
    extend: {
      height: {
        content: 'calc(100vh - 56px)',
        'content-md': 'calc(100vh - 66px)'
      },
      width: {
        'content-md': 'calc(100vw - 290px)'
      }
    }
  }
} satisfies Config;
