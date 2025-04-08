import type { Config } from 'tailwindcss';

import { aria, scrollbars } from '@stack/tailwind';

export default {
  plugins: [scrollbars(), aria()]
} satisfies Config;
