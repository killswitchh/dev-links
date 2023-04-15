<script lang="ts">
  import type { PageData } from '../../../routes/(protected)/admin/links/$types';

  import type { NullSafePageItem } from '../../../types';
  import CreatePage from './CreateLinkGroup.svelte';
  import PageDisplay from './LinkGroupDisplay.svelte';
  export let linkGroup: NullSafePageItem;
  export let data: PageData;
</script>

<div
  class="sm:w-[450px] w-full flex flex-col rounded-lg bg-white shadow-lg dark:bg-neutral-900 md:max-w-xl md:flex-row justify-center"
>
  {#if !linkGroup}
    <CreatePage data="{data}" />
  {:else}
    <PageDisplay linkGroup="{linkGroup}" />
  {/if}
</div>
