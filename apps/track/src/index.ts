// entry-node.js
import adapter from '@hattip/adapter-bun';

import { router } from './routes';

// export default router;
export default adapter(
  router,
  // @ts-expect-error
  { port: 3001 }
);
