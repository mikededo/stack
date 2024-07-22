/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MSTACK_DEV_SUPABASE_URL: string;
  readonly MSTACK_DEV_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
