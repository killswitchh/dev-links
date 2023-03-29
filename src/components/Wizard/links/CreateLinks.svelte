<script lang="ts">
  import type { Link } from '../../../core/models/link.dto';
  import CreateLink from './CreateLink.svelte';
  import LinkDisplay from './LinkDisplay.svelte';

  export let links: Link[] | undefined;
</script>

<div class="m-2 min-h-[80%] bg-slate-400 rounded-xl flex flex-col items-center">
  {#if links && links.length > 0}
    {#each links as link}
      <LinkDisplay link="{link}" />
    {/each}
  {/if}

  <div class="mt-2 mb-2 w-[50%] bg-white rounded-xl flex flex-col items-center">
    <CreateLink />
  </div>
</div>
