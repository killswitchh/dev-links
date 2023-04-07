// src/hooks.server.ts
import { PUBLIC_VITE_SUPABASE_ANON_KEY, PUBLIC_VITE_SUPABASE_URL } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Session } from '@supabase/supabase-js';
import { error, redirect, type Handle, type RequestEvent } from '@sveltejs/kit';
import UserService from './service/api/user.service';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_VITE_SUPABASE_URL,
    supabaseKey: PUBLIC_VITE_SUPABASE_ANON_KEY,
    event,
  });

  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession();
    return session;
  };

  if (event.url.pathname.startsWith('/admin')) {
    const session: Session = await event.locals.getSession();
    await populateUser(session, event);
    console.log('LOCALS USER', event.locals.user, !!session);
    if (!session) {
      throw redirect(303, '/');
    }
  }

  if (
    event.url.pathname.startsWith('/api') &&
    (event.request.method === 'POST' || event.request.method === 'PATCH')
  ) {
    const session = await event.locals.getSession();
    await populateUser(session, event);
    if (!session) {
      throw error(303, '/');
    }
  }

  return resolve(event, {
    /**
     * There´s an issue with `filterSerializedResponseHeaders` not working when using `sequence`
     * https://github.com/sveltejs/kit/issues/8061
     */
    filterSerializedResponseHeaders(name) {
      return name === 'content-range';
    },
  });
};
async function populateUser(
  session: Session,
  event: RequestEvent<Partial<Record<string, string>>, string | null>,
) {
  if (session && event.locals.user) return;
  if (session) {
    event.locals.user = await UserService.getOrCreateUser(
      session.user.email as string,
      session.user.user_metadata.name,
    );
  } else {
    event.locals.user = null;
  }
}
