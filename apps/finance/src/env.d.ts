/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MSTACK_DEV_SUPABASE_ANON_KEY: string;
  readonly MSTACK_DEV_SUPABASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
