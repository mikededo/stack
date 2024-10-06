import { env } from '$env/dynamic/public';

type Env = {
  supabaseAnonKey: string;
  supabaseUrl: string;
};

export const getEnv = (): Env => {
  const supabaseUrl = env.PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL or Anon Key not set');
  }

  return { supabaseAnonKey, supabaseUrl };
};
