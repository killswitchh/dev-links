<script lang="ts">
  import { enhance, type SubmitFunction } from '$app/forms';
  import type { Provider, Session } from '@supabase/supabase-js';
  import { appStore, darkTheme, userStore } from '../../../stores';
  import { supabase } from '../../../supabaseClient';

  let session: Session | null | undefined = null;

  appStore.subscribe((x) => {
    session = x.user;
  });
  let loading = false;

  $: dark = $darkTheme;
  $: user = $userStore;

  const handleLogout = async () => {
    try {
      loading = true;
      const { error } = await supabase.auth.signOut();
      appStore.updateCurrentSession(null);
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      loading = false;
    }
  };

  const signInWithProvider = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
    });
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
  {#if !session}
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
                <img
                  alt="github logo"
                  src="/src/lib/images/github.svg"
                  height="30px"
                  width="30px"
                />
                Continue with Github
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  {:else}
    <h1>Welcome {session.user.email}</h1>
    <p>I am logged in!</p>
    <button
      type="submit"
      aria-live="polite"
      disabled="{loading}"
      class="inline-block w-full rounded bg-primary px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
      on:click|preventDefault="{() => handleLogout()}"
    >
      <span>{loading ? 'Loading' : 'Logout'}</span>
    </button>
  {/if}
</div>
