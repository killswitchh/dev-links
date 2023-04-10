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

<div class="flex flex-row p-5">
  <div class="flex flex-col justify-center h-full">
    <div class="rounded-full w-[90px] border h-[90px]">
      {#if linkGroup.imageURL}
        <img
          class="h-full w-full object-fill rounded-full"
          alt="link-group-header"
          src="{linkGroup.imageURL}"
        />
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="{1.5}"
          stroke="currentColor"
          class="h-full w-full"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
        </svg>
      {/if}
    </div>
  </div>
  <div class="flex flex-col justify-start p-6">
    <div
      class="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50 flex flex-row justify-between"
    >
      <div>
        {linkGroup.name}
      </div>
      {#if linkGroup.active}
        <a href="/{linkGroup.name}" target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            ></path>
          </svg>
        </a>
      {/if}
      {#if $loading}
        <Loader />
      {/if}
    </div>
    {#if linkGroup.description}
      <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
        {linkGroup.description}
      </p>
    {/if}
    <p class="text-xs text-neutral-500 dark:text-neutral-300">
      Updated: {new Date(linkGroup.updatedTs)}
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
</div>
