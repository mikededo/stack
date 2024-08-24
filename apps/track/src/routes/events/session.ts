import type { TrackRouter } from '../router';

import { eventRoute } from './shared';

export const startSessionRoute = (router: TrackRouter) => {
  router.get(
    eventRoute('session-start'),
    async () =>
      new Response(undefined, {
        status: 200
      })
  );
};

export const endSessionRoute = (router: TrackRouter) => {
  router.get(
    eventRoute('session-end'),
    async () =>
      new Response(undefined, {
        status: 200
      })
  );
};
