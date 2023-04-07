<script lang="ts">
  import { goto } from '$app/navigation';
  import { afterUpdate, onMount } from 'svelte';
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

<section>Welcome to Dev Links</section>

<style lang="postcss">
</style>
