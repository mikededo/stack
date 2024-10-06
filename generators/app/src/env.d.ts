/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly STACK_DEV_SUPABASE_ANON_KEY: string;
  readonly STACK_DEV_SUPABASE_URL: string;

  readonly STACK_PROD_SUPABASE_ANON_KEY: string;
  readonly STACK_PROD_SUPABASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
