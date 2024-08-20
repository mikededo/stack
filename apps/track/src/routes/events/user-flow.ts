import type { TrackRouter } from '../router';

import { eventRoute } from './shared';

export const userFlowRoute = (router: TrackRouter) => {
  router.get(
    eventRoute('flow'),
    async () =>
      new Response(undefined, {
        status: 200
      })
  );
};
