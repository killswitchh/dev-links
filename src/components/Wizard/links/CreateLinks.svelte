<script lang="ts">
  import type { Link } from '../../../core/models/link.dto';
  import type { PageData } from '../../../routes/create/$types';
  import CreateLink from './CreateLink.svelte';
  import LinkDisplay from './LinkDisplay.svelte';

  export let links: Link[] | undefined;
  export let data: PageData;
</script>

{#if links && links.length > 0}
  {#each links as link}
    <LinkDisplay link="{link}" />
  {/each}
{/if}

<div class="mt-2 mb-2 w-[50%] bg-white dark:bg-slate-700 rounded-xl flex flex-col items-center">
  <CreateLink data="{data}" />
</div>
