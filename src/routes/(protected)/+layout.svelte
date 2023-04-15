<script lang="ts">
  import { routesLoggedIn } from '../../routes';
  import Header from '../Header.svelte';
</script>

<Header nav_bar="{routesLoggedIn}" />
<main class="mt-[95px]">
  <slot />
</main>

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: 2%;
    padding-right: 2%;
    width: 100%;
    box-sizing: border-box;
    word-wrap: break-word;
  }
</style>
