<!-- eslint-disable-file -->

# @stack/supabase

This package provides a set of utilities to work with Supabase in SvelteKit.

## Hooks

Create a `hooks.server.ts` file in the root of your project and add the
following code:

````ts
import { createSupabaseServerClient, getSession } from '@stack/supabase';

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient<{}>('', '', event);
  event.locals.safeGetSession = async () => getSession(event.locals.supabase);

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === 'x-supabase-api-version';
    }
  });
};

> Note: Remember to update `app.d.ts` file to include the necessary types.

```ts
import type { Session, SupabaseClient, User } from '@supabase/supabase-js';

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient;
      safeGetSession(): Promise<{ session: Session | null; user: User | null }>;
    }
    interface PageData {
      session: Session | null;
      user: User | null;
    }
  }
}

export {};
````

## Context

While this is not strictly required, it is recommended to use the context API
from Svelte in order to access the Supabase client when needed. The context is
strongly typed, so you can be sure that the client you are using is the one
you expect.

In your root `+layout.svelte`:

```svelte
<script lang="ts">
    import { setSupabaseClient } from '@stack/supabase';

    setSupabaseClient(supabase);
</script>
```

Therefore, whenever you need to access the Supabase client, you can do so by

```svelte
<script lang="ts">
    import { getSupabaseClient } from '@stack/supabase';

    // You can provide the schema name for the supabase client
    const supabase = getSupabaseClient<'public'>();
</script>
```

## Types

Supabase types are auto-generated from the Supabase CLI. In order to update
them, simply run:

```bash
bun db-types
```
