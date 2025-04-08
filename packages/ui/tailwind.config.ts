import type { Config } from 'tailwindcss';

import { aria, scrollbars } from '@stack/tailwind-config';

export default {
  plugins: [aria(), scrollbars()]
} satisfies Config;
