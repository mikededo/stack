import type { Config } from 'tailwindcss';

import { scrollbars, theme, typography } from '@stack/tailwind-config';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  plugins: [typography(), scrollbars()],
  presets: [{ theme }],
  theme: {
    extend: {
      aria: {
        current: 'current="true"',
        invalid: 'invalid="true"',
        'not-current': 'current="false"'
      },
      height: {
        'top-bar-md': 'calc(100vh - 48px)'
      }
    }
  }
} satisfies Config;
