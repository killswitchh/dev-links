<script lang="ts">
  import type { PageData } from '../$types';
  import { supabase } from '../../../../supabaseClient';

  export let data: PageData;
  let loading: boolean;

  const handleLogout = async () => {
    try {
      loading = true;
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      loading = false;
    }
  };
</script>

<h1>Welcome {data.session?.user.email}</h1>
<form method="POST">
  <button
    formaction="?/logout"
    type="submit"
    aria-live="polite"
    disabled="{loading}"
    class="inline-block w-full rounded bg-primary px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
  >
    <span>{loading ? 'Loading' : 'Logout'}</span>
  </button>
</form>
