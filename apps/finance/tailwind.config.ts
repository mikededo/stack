import type { Config } from 'tailwindcss';

import { scrollbars } from '@stack/tailwind';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  plugins: [scrollbars()]
} satisfies Config;
