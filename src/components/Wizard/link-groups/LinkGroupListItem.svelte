<script lang="ts">
  import type { NullSafePageItem } from '../../../types';
  import CreatePage from './CreateLinkGroup.svelte';
  import PageDisplay from './LinkGroupDisplay.svelte';
  export let linkGroup: NullSafePageItem;
</script>

<div
  class="w-[40%] flex flex-col rounded-lg bg-white shadow-lg dark:bg-neutral-700 md:max-w-xl md:flex-row justify-center"
>
  {#if !linkGroup}
    <CreatePage />
  {:else}
    <PageDisplay linkGroup="{linkGroup}" />
  {/if}
</div>
