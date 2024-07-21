import { theme, typography } from '@mstack/tailwind-config';

import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.svelte', './src/**/*.ts', './src/**/*.html'],
  theme,
  darkMode: 'class',
  plugins: [typography()]
} satisfies Config;
