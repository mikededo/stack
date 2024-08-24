import type { TrackRouter } from '../router';

import { pageViewRote } from './page-view';

export const addEventsRoutes = (router: TrackRouter) => {
  // TODO: Add other routers
  pageViewRote(router);
};
