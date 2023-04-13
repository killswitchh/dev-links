import { redirect, type Actions } from '@sveltejs/kit';
export const config = {
  runtime: 'edge',
  regions: ['bom1'],
};
export const actions: Actions = {
  logout: async ({ locals: { supabase } }) => {
    console.log('signing out');
    await supabase.auth.signOut();
    throw redirect(303, '/');
  },
};
