import type { Config } from 'tailwindcss';

import { aria, scrollbars, theme } from '@stack/tailwind-config';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  plugins: [scrollbars(), aria()],
  presets: [{ theme }],
  theme: {
    extend: {
    }
  }
} satisfies Config;
