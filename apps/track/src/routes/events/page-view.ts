import type { TrackRouter } from '../router';

import { eventRoute } from './shared';

export const pageViewRote = (router: TrackRouter) => {
  router.get(
    eventRoute('page-view'),
    async () =>
      new Response(undefined, {
        status: 200
      })
  );
};
