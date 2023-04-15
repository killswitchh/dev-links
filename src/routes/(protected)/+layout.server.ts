import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals.getSession();
  const user = event.locals.user;
  if (!session || !user || session?.user.email != user.email) {
    throw error(401, 'Unauthorized');
  }
  return {
    session: event.locals.getSession(),
  };
};
