import type { Config } from 'tailwindcss';

import { aria, scrollbars, theme } from '@stack/tailwind-config';

export default {
  content: ['./src/**/*.svelte', './src/**/*.ts'],
  darkMode: 'class',
  plugins: [aria(), scrollbars()],
  prefix: 'ui-',
  presets: [{ theme }]
} satisfies Config;
