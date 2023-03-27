import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { getSession } }) => {
  const session = await getSession();
  if (!session) {
    throw error(401, { message: 'Unauthorized' });
  }
  return {
    session: getSession(),
  };
}) satisfies PageServerLoad;
