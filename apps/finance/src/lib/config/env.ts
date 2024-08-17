import { dev } from '$app/environment';

export const getEnv = () => {
  const supabaseUrl = dev
    ? import.meta.env.STACK_DEV_SUPABASE_URL
    : process.env.STACK_PROD_SUPABASE_URL;
  const supabaseAnonKey = dev
    ? import.meta.env.STACK_DEV_SUPABASE_ANON_KEY
    : process.env.STACK_PROD_SUPABASE_ANON_KEY;

  return { supabaseAnonKey, supabaseUrl };
};
