import { dev } from '$app/environment';

type Env = {
  supabaseAnonKey: string;
  supabaseUrl: string;
};

export const getEnv = (): Env => {
  const supabaseUrl = dev
    ? import.meta.env.STACK_DEV_SUPABASE_URL
    : process.env.STACK_PROD_SUPABASE_URL;
  const supabaseAnonKey = dev
    ? import.meta.env.STACK_DEV_SUPABASE_ANON_KEY
    : process.env.STACK_PROD_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL or Anon Key not set. Check logs');
  }

  return { supabaseAnonKey, supabaseUrl };
};
