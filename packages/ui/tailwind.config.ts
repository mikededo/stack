import type { Config } from 'tailwindcss';

import { theme } from '@stack/tailwind-config';

export default {
  content: ['./src/**/*.svelte', './src/**/*.ts'],
  darkMode: 'class',
  prefix: 'ui-',
  presets: [{ theme }]
} satisfies Config;
