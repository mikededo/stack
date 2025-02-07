import type { Config } from 'tailwindcss';

import { aria, scrollbars, theme, typography } from '@stack/tailwind-config';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  plugins: [aria(), typography(), scrollbars()],
  presets: [{ theme }],
  theme: {
  }
} satisfies Config;
