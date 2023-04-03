import { json, type RequestHandler } from '@sveltejs/kit';
import { appStore } from '../../../../stores';
import { supabase } from '../../../../supabaseClient';

export const POST = (async () => {
  const { error } = await supabase.auth.signOut();
  appStore.updateCurrentSession(null);
  if (error) throw error;
  return json({ loggedOut: true });
}) satisfies RequestHandler;
