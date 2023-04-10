<script lang="ts">
  import { afterUpdate } from 'svelte';
  import LinkGroupListItem from '../../../../components/Wizard/link-groups/LinkGroupListItem.svelte';
  import type { NullSafePageItem as NullSafeLinkGroupItem } from '../../../../types';
  import type { PageData } from './$types';

  export let data: PageData;
  let linkGroups: NullSafeLinkGroupItem[] = [];

  afterUpdate(() => {
    linkGroups = data.linkGroups.filter(() => true) satisfies NullSafeLinkGroupItem[];
    while (linkGroups.length < data.pageLimit) {
      linkGroups.push(null);
    }
  });
</script>

{#each linkGroups as linkGroup}
  <div class="flex justify-center mb-5">
    <LinkGroupListItem linkGroup="{linkGroup}" />
  </div>
{/each}
