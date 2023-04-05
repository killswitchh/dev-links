<script lang="ts">
  import { goto } from '$app/navigation';
  import { get } from 'svelte/store';
  import type { LinkGroup } from '../../../core/models/link-group.dto';
  import { linkGroupStore } from '../../../stores';

  export let linkGroup: LinkGroup;

  async function editOnClick() {
    linkGroupStore.set(linkGroup);
    const storeValue = get(linkGroupStore);
    if (storeValue) {
      goto(`/admin/create?name=${storeValue.name}`);
    }
  }
</script>

<div class="flex flex-col justify-start p-6">
  <h5 class="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
    {linkGroup.id}
  </h5>
  <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
    {linkGroup.name}
  </p>
  <p class="text-xs text-neutral-500 dark:text-neutral-300">
    Last updated {linkGroup.updatedTs}
  </p>
</div>
<div class="flex flex-col items-center align-middle h-full">
  <button
    on:click="{() => editOnClick()}"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
  >
    Edit
  </button>
</div>
