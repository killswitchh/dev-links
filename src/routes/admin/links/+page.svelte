<script lang="ts">
  import PageListItem from '../../../components/Wizard/pages/PageListItem.svelte';
  import type { NullSafePageItem } from '../../../types';
  import type { PageData } from './$types';

  export let data: PageData;

  const pages: NullSafePageItem[] = data.pages.filter(() => true) satisfies NullSafePageItem[];
  while (pages.length < data.pageLimit) {
    pages.push(null);
  }
</script>

{#each pages as page}
  <div class="flex justify-center mb-5">
    <PageListItem page="{page}" />
  </div>
{/each}
