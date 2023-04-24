<script lang="ts">
  import { goto } from '$app/navigation';
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

<div class="w-full h-[80vh] flex flex-row justify-center items-center align-middle">
  <div
    class="flex flex-col justify-center p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100"
  >
    <div class="space-y-4 text-center divide-y divide-gray-700">
      <div class="my-2 space-y-1">
        <h2 class="text-xl font-semibold sm:text-2xl">{data.session?.user.user_metadata.name}</h2>
        <p class="px-3 text-xs sm:text-base dark:text-gray-400">{data.session?.user.email}</p>
      </div>
      <form method="POST" class="pt-3">
        <button
          on:click|preventDefault="{() => goto('/admin/links')}"
          disabled="{loading}"
          class=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none min-w-[98px]"
        >
          My Links
        </button>
        <button
          formaction="?/logout"
          type="submit"
          disabled="{loading}"
          class=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none min-w-[98px]"
        >
          {loading ? 'Loading' : 'Logout'}
        </button>
      </form>
    </div>
  </div>
</div>
