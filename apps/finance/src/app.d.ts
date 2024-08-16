import type { Client } from '@stack/svelte-supabase';

import type { Session, User } from '@supabase/supabase-js';

declare global {
  namespace App {
    interface Locals {
      safeGetSession(): Promise<{ session: null | Session; user: null | User }>;
      supabase: Client;
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
