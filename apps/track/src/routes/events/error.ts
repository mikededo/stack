import type { TrackRouter } from '../router';

import { eventRoute } from './shared';

export const errorRoute = (router: TrackRouter) => {
  router.get(
    eventRoute('error'),
    async () =>
      new Response(undefined, {
        status: 200
      })
  );
};
