<script lang="ts">
  import { goto } from '$app/navigation';
  import { afterUpdate } from 'svelte';
  import Features from '../../components/homepage/Features.svelte';
  import Hero from '../../components/homepage/Hero.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  afterUpdate(() => {
    console.log('SESSION FOUND', !!data.session);
    if (data.session) {
      goto('/admin/profile');
    }
  });
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="h-[100vh] overflow-y-scroll scroll-smooth">
  <div class="flex flex-col min-h-screen overflow-hidden">
    <div class="flex-grow">
      <Hero />
      <Features />
    </div>
  </div>
</div>

<style lang="postcss">
</style>
