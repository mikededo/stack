import { theme } from '@mstack/tailwind-config';

import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.svelte', './src/**/*.ts'],
  darkMode: 'class',
  prefix: 'ui-',
  presets: [{ theme }]
} satisfies Config;
