import type { BunPlatformInfo } from '@hattip/adapter-bun';
import type { Router } from '@hattip/router';

import { createRouter } from '@hattip/router';

import { addEventsRoutes } from './events';

const router = createRouter<BunPlatformInfo>();

addEventsRoutes(router);

export type TrackRouter = Router<BunPlatformInfo>;
export default router.buildHandler();
