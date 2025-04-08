import type { Config } from 'tailwindcss';

import { scrollbars } from '@stack/tailwind';

export default {
  plugins: [scrollbars()]
} satisfies Config;
