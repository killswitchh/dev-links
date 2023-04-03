<script lang="ts">
  import PageListItem from '../../../components/Wizard/link-groups/LinkGroupListItem.svelte';
  import type { NullSafePageItem } from '../../../types';
  import type { PageData } from './$types';

  export let data: PageData;

  const linkGroups: NullSafePageItem[] = data.linkGroups.filter(
    () => true,
  ) satisfies NullSafePageItem[];
  while (linkGroups.length < data.pageLimit) {
    linkGroups.push(null);
  }
</script>

{#each linkGroups as linkGroup}
  <div class="flex justify-center mb-5">
    <PageListItem linkGroup="{linkGroup}" />
  </div>
{/each}
