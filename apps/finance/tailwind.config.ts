import { theme, typography } from '@mstack/tailwind-config';

import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  plugins: [typography()],
  presets: [{ theme }]
} satisfies Config;
