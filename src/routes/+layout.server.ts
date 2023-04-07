import type { Session } from '@supabase/supabase-js';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  const session: Session = await event.locals.getSession();

  return {
    session: event.locals.getSession(),
    sessionDetails: session,
    user: event.locals.user,
  };
};
