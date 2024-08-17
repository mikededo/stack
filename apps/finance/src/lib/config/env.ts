import { dev } from '$app/environment';
import { env } from '$env/dynamic/public';

type Env = {
  supabaseAnonKey: string;
  supabaseUrl: string;
};

export const getEnv = (): Env => {
  const supabaseUrl = dev ? import.meta.env.STACK_DEV_SUPABASE_URL : env.PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = dev
    ? import.meta.env.STACK_DEV_SUPABASE_ANON_KEY
    : env.PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.log({
      PUBLIC_SUPABASE_ANON_KEY: env.PUBLIC_SUPABASE_ANON_KEY,
      PUBLIC_SUPABASE_URL: env.PUBLIC_SUPABASE_URL,
      STACK_DEV_SUPABASE_ANON_KEY: import.meta.env.STACK_DEV_SUPABASE_ANON_KEY,
      STACK_DEV_SUPABASE_URL: import.meta.env.STACK_DEV_SUPABASE_URL
    });
    throw new Error('Supabase URL or Anon Key not set. Check logs');
  }

  return { supabaseAnonKey, supabaseUrl };
};
