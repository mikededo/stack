import type { Database } from '@mstack/svelte-supabase';

import type { Session, SupabaseClient, User } from '@supabase/supabase-js';

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient<Database>;
      safeGetSession(): Promise<{ session: Session | null; user: User | null }>;
    }
    interface PageData {
      session: Session | null;
      user: User | null;
    }

    // interface Error {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
