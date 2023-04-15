<script lang="ts">
  import { onMount } from 'svelte';
  import '../app.css';

  import { invalidate } from '$app/navigation';
  import { navigating } from '$app/stores';
  import FullScreenLoader from '../components/common/FullScreenLoader.svelte';
  import PageTransition from '../components/common/Transition.svelte';
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
</script>

<div class="{dark ? 'dark' : ''}">
  <div
    class="app flex flex-col min-h-screen bg-stone-100 dark:bg-black dark:text-white text-black overflow-auto"
  >
    <PageTransition key="{data.url}" duration="{300}">
      {#if $navigating}
        <FullScreenLoader />
      {:else}
        <slot />
      {/if}
    </PageTransition>
  </div>
</div>
