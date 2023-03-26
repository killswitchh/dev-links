<script lang="ts">
  import PageListItem from '../../components/PageListItem.svelte'
  import type { PageData } from './$types'

  export let data: PageData
</script>

{#each data.pages as page}
  <PageListItem page="{page}" />
{/each}
