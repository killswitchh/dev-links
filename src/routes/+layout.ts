import { PUBLIC_VITE_SUPABASE_ANON_KEY, PUBLIC_VITE_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, data, depends, url }) => {
  depends('supabase:auth');

  const supabase = createSupabaseLoadClient({
    supabaseUrl: PUBLIC_VITE_SUPABASE_URL,
    supabaseKey: PUBLIC_VITE_SUPABASE_ANON_KEY,
    event: { fetch },
    serverSession: data.session,
  });

  const user = data.user;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return { supabase, session, user, url: url.pathname };
};
