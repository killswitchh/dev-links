<script lang="ts">
  import type { Link } from '@prisma/client';
  import type { PageData } from '../../../routes/(protected)/admin/create/$types';

  import CreateLink from './CreateLink.svelte';
  import LinkDisplay from './LinkDisplay.svelte';

  export let links: Link[] | null;
  export let data: PageData;
</script>

{#if links && links.length > 0}
  {#each links as link}
    <LinkDisplay link="{link}" data="{data}" />
  {/each}
{/if}

<CreateLink data="{data}" />
