import type { Provider, Session } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
  const session: Session = await event.locals.getSession();
  console.log('session', session);
  if (session) {
    throw redirect(301, '/admin/links');
  }
  return {
    session: event.locals.getSession(),
  };
}) satisfies PageServerLoad;

const OAUTH_PROVIDERS = ['google', 'discord', 'github'];

export const actions = {
  login: async ({ locals, url }) => {
    console.log('testing');
    const provider = url.searchParams.get('provider') as Provider;

    if (provider) {
      if (!OAUTH_PROVIDERS.includes(provider)) {
        return fail(400, {
          error: 'Provider not supported.',
        });
      }
      const { data, error: err } = await locals.supabase.auth.signInWithOAuth({
        provider: provider,
      });

      if (err) {
        console.log(err);
        return fail(400, {
          message: 'Something went wrong.',
        });
      }

      throw redirect(303, data.url);
    }
  },
};
