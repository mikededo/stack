import type { Config } from 'tailwindcss';

import { aria, scrollbars } from '@stack/tailwind';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  plugins: [scrollbars(), aria()]
} satisfies Config;
