import type { LayoutServerLoad } from './$types';

import { requireAuth } from '@stack/layouts';
import { pathTo } from '$lib/config';

export const load: LayoutServerLoad = ({ locals }) => requireAuth(locals, pathTo('signIn'));
