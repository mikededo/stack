import type { Config } from 'tailwindcss';

import { aria, scrollbars } from '@stack/tailwind';

export default {
  plugins: [aria(), scrollbars()]
} satisfies Config;
