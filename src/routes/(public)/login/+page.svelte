<script lang="ts">
  import { enhance, type SubmitFunction } from '$app/forms';
  import github from '$lib/images/github.svg';
  import type { Provider } from '@supabase/supabase-js';

  import { supabase } from '../../../supabaseClient';
  import { PUBLIC_APP_URL } from '$env/static/public';

  let loading = false;

  const signInWithProvider = async (provider: Provider) => {
    loading = true;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${PUBLIC_APP_URL}/links`,
      },
    });
    loading = false;
  };

  const submitSocialLogin: SubmitFunction = async ({ action, cancel }) => {
    switch (action.searchParams.get('provider')) {
      case 'github':
        await signInWithProvider('github');
        break;
      default:
        break;
    }
    cancel();
  };
</script>

<div>
  <section>
    <div class="container h-full px-6 py-24">
      <div class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
        <div class="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            class="w-full"
            alt="Phone"
          />
        </div>
        <div class="md:w-8/12 lg:ml-6 lg:w-5/12">
          <form method="POST" use:enhance="{submitSocialLogin}">
            <button
              class="mb-3 flex w-full items-center justify-center rounded bg-slate-500 px-7 pt-3 pb-2.5 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              formaction="?/login&provider=github"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              <img alt="github logo" src="{github}" height="30px" width="30px" />
              Continue with Github
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</div>
