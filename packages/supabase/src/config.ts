type SupabaseEnv = {
  supabaseUrl: string;
  supabaseAnonKey: string;
};

export const getSupabaseEnv = (env: Record<string, string | undefined>): SupabaseEnv => {
  const supabaseUrl = env.PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL or Anon Key not set');
  }

  return { supabaseAnonKey, supabaseUrl };
};
