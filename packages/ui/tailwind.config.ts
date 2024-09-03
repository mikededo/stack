import type { Config } from 'tailwindcss';

import { scrollbars, theme } from '@stack/tailwind-config';

export default {
  content: ['./src/**/*.svelte', './src/**/*.ts'],
  darkMode: 'class',
  plugins: [scrollbars()],
  prefix: 'ui-',
  presets: [{ theme }]
} satisfies Config;
