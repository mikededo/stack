import type { Database } from '@mstack/svelte-supabase';

import type { Session, SupabaseClient, User } from '@supabase/supabase-js';

declare global {
  namespace App {
    interface Locals {
      safeGetSession(): Promise<{ session: null | Session; user: null | User }>;
      supabase: SupabaseClient<Database>;
    }
    interface PageData {
      session: null | Session;
      user: null | User;
    }

    // interface Error {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
