import type { Config } from 'tailwindcss';

import { scrollbars } from '@stack/tailwind';

export default {
  darkMode: 'class',
  plugins: [scrollbars()]
} satisfies Config;

