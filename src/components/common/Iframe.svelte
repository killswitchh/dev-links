<script lang="ts">
  import { afterUpdate, onDestroy, onMount } from 'svelte';

  export let app: string;
  export let url: string;

  onMount(() => {
    console.log(`Mounted ${app}`);
  });

  afterUpdate(() => {
    console.log(`Updated ${app}`);
  });

  onDestroy(() => {
    console.log(`Destroyed ${app}`);
  });
</script>

<iframe title="{app}" id="microapp-{app}" frameborder="0" scrolling="no" src="{url}"></iframe>

<style>
  iframe {
    width: 100%;
    height: 1000px;
  }
</style>
