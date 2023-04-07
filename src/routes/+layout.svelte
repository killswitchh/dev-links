<script lang="ts">
  import { onMount } from 'svelte';
  import '../app.css';

  import { invalidate } from '$app/navigation';
  import { darkTheme } from '../stores';
  import type { LayoutData } from './$types';
  import './styles.css';
  $: dark = $darkTheme;

  export let data: LayoutData;

  $: ({ supabase, session } = data);

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth');
      }
    });

    return () => subscription.unsubscribe();
  });

  $: if (data.session) {
    console.log('[Session Changed]', !!data.user);
  }
</script>

<div class="{dark ? 'dark' : ''}">
  <div
    class="app flex flex-col min-h-screen bg-slate-50 dark:bg-slate-800 dark:text-white text-black"
  >
    <main>
      <slot />
    </main>
  </div>
</div>
