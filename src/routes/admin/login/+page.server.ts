import type { Provider, Session } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import AppError from '../../../core/models/app-error.dto';
import type { CreateUserRequest, User } from '../../../core/models/user.dto';
import type { PageServerLoad } from './$types';
import { UserService } from './../../../service/api/user.service';
import { userStore } from './../../../stores';

export const load = (async (event) => {
  const session: Session = await event.locals.getSession();
  let user: User | null = null;
  if (session) {
    try {
      user = await UserService.getUserForEmail(session.user.email as string);
    } catch (e) {
      if (e instanceof AppError && e.errorCode === 404) {
        const userRequest: CreateUserRequest = {
          name: session.user.user_metadata?.full_name,
          email: session.user.email as string,
        };
        user = await UserService.createUser(userRequest);
      }
    }
  }
  if (user) {
    userStore.set(user);
  }
  return {
    test: 'test',
    session: session,
    user: user,
  };
}) satisfies PageServerLoad;

const OAUTH_PROVIDERS = ['google', 'discord', 'github'];

export const actions = {
  login: async ({ locals, url }) => {
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
        console.error(err);
        return fail(400, {
          message: 'Something went wrong.',
        });
      }

      throw redirect(303, data.url);
    }
  },
};
