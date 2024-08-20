// entry-node.js
import adapter from '@hattip/adapter-bun';

import { initClient } from './client';
import { router } from './routes';

const client = await initClient();
client.close();

// export default router;
export default adapter(
  router,
  // @ts-expect-error
  { port: 3001 }
);
