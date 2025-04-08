import type { Config } from 'tailwindcss';

import { aria, scrollbars } from '@stack/tailwind';

export default {
  darkMode: 'class',
  plugins: [aria(), scrollbars()]
} satisfies Config;

