import type { Config } from 'tailwindcss';

import { aria, scrollbars, theme } from '@stack/tailwind-config';

export default {
  content: ['./src/**/*.svelte', './src/**/*.ts'],
  darkMode: 'class',
  plugins: [scrollbars(), aria()],
  presets: [{ theme }]
} satisfies Config;
