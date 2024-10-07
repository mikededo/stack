import type { Config } from 'tailwindcss';

import { scrollbars, theme } from '@stack/tailwind-config';

export default {
  content: ['./src/**/*.svelte', './src/**/*.ts'],
  darkMode: 'class',
  plugins: [scrollbars()],
  prefix: 'l-',
  presets: [{ theme }]
} satisfies Config;
