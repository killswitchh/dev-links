// src/routes/profile/+page.ts
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
  const { supabase, session } = await parent();
  if (!session) {
    throw redirect(303, '/');
  }
  const { data: tableData } = await supabase.from('test').select('*');

  return {
    user: session.user,
    tableData,
  };
};
