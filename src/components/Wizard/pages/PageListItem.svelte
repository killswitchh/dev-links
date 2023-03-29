<script lang="ts">
  import type { NullSafePageItem } from '../../../types';
  import CreatePage from './CreatePage.svelte';
  import PageDisplay from './PageDisplay.svelte';
  export let page: NullSafePageItem;
</script>

<div
  class="w-[40%] flex flex-col rounded-lg bg-white shadow-lg dark:bg-neutral-700 md:max-w-xl md:flex-row justify-center"
>
  {#if !page}
    <CreatePage />
  {:else}
    <PageDisplay page="{page}" />
  {/if}
</div>
