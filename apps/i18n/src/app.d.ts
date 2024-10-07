import type { SupabaseLocals, SupabasePageData } from '@stack/supabase';

declare global {
  namespace App {
    interface Locals extends SupabaseLocals { }
    interface PageData extends SupabasePageData { }

    // interface Error {}
    // interface PageState {}
    // interface Platform {}
  }
}

export { };
