<script lang="ts">
  import { appStore, darkTheme } from '../stores';

  import type { Session } from '@supabase/supabase-js';
  import '../app.css';
  import Header from './Header.svelte';
  import './styles.css';
  $: dark = $darkTheme;

  let user: Session | null | undefined;

  appStore.subscribe((store) => (user = store.user));
</script>

<div class="{dark ? 'dark' : ''}">
  <div
    class="app flex flex-col min-h-screen bg-slate-50 dark:bg-slate-800 dark:text-white text-black"
  >
    <Header />
    <main class="mt-[5%]">
      <slot />
    </main>
  </div>
</div>

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2%;
    width: 100%;
    box-sizing: border-box;
    word-wrap: break-word;
  }
</style>
