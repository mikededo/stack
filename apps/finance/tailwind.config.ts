import type { Config } from 'tailwindcss';

import { theme, typography } from '@mstack/tailwind-config';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  plugins: [typography()],
  presets: [{ theme }],
  theme: {
    extend: {
      aria: {
        current: 'current="true"',
        invalid: 'invalid="true"',
        'not-current': 'current="false"'
      },
      height: {
        'top-bar-md': 'calc(100vh - var(--md-top-bar-h))',
        'top-bar-sm': 'var(--sm-top-bar-h)'
      }
    }
  }
} satisfies Config;
