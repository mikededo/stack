import type { TrackRouter } from '../router';

import { eventRoute } from './shared';

export const actionRoute = (router: TrackRouter) => {
  router.get(
    eventRoute('action'),
    async () =>
      new Response(undefined, {
        status: 200
      })
  );
};
