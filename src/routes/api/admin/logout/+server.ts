import { json, type RequestHandler } from '@sveltejs/kit';
import { supabase } from '../../../../supabaseClient';

export const POST = (async () => {
  const { error } = await supabase.auth.signOut();
  console.log('logged out', await supabase.auth.getSession());
  if (error) throw error;
  return json({ loggedOut: true });
}) satisfies RequestHandler;
