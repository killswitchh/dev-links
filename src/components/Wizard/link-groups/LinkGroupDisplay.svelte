<script lang="ts">
  import { goto, invalidateAll } from '$app/navigation';
  import { get } from 'svelte/store';
  import type { LinkGroup } from '../../../core/models/link-group.dto';
  import type { ActivateInactivateEventContent } from '../../../core/models/theme.dto';
  import { ApiWrapper } from '../../../service/api-wrapper.service';
  import { linkGroupStore, loading } from '../../../stores';
  import Loader from '../../common/Loader.svelte';
  import StatusButton from '../../common/StatusButton.svelte';

  export let linkGroup: LinkGroup;

  async function editOnClick() {
    if ($loading) {
      return;
    }
    linkGroupStore.set(linkGroup);
    const storeValue = get(linkGroupStore);
    if (storeValue) {
      goto(`/admin/create?name=${storeValue.name}`);
    }
  }

  async function handleStatusChange(event: CustomEvent<ActivateInactivateEventContent>) {
    if (!linkGroup || $loading) {
      return;
    }
    loading.set(true);
    switch (event.detail.action) {
      case 'INACTIVATE':
        await ApiWrapper.patch(`/api/link-groups/inactivate/${linkGroup.id}`);
        invalidateAll().then(() => loading.set(false));
        break;
      case 'ACTIVATE':
        await ApiWrapper.patch(`/api/link-groups/activate/${linkGroup.id}`);
        invalidateAll().then(() => loading.set(false));
        break;
    }
  }
</script>

<div class="flex flex-col justify-start p-6">
  <div
    class="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50 flex flex-row justify-between"
  >
    <div>
      {linkGroup.name}
    </div>
    {#if $loading}
      <Loader />
    {/if}
  </div>
  <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
    {linkGroup.id}
  </p>
  <p class="text-xs text-neutral-500 dark:text-neutral-300">
    Last updated {linkGroup.updatedTs}
  </p>
  <div class="flex flex-row justify-between">
    <StatusButton
      disabled="{$loading}"
      status="{!!linkGroup.active}"
      on:clicked="{(e) => handleStatusChange(e)}"
    />
    <button
      disabled="{$loading}"
      on:click="{() => editOnClick()}"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
    >
      Edit
    </button>
  </div>
</div>
