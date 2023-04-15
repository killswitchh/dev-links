<script lang="ts">
  import { goto, invalidateAll } from '$app/navigation';
  import dayjs from 'dayjs';
  import { get } from 'svelte/store';
  import type { LinkGroupOptional } from '../../../core/models/link-group.dto';
  import type { ActivateInactivateEventContent } from '../../../core/models/theme.dto';
  import { ApiWrapper } from '../../../service/api-wrapper.service';
  import { linkGroupStore, loading } from '../../../stores';
  import Loader from '../../common/Loader.svelte';
  import StatusButton from '../../common/StatusButton.svelte';

  export let linkGroup: LinkGroupOptional;

  async function editOnClick() {
    if (!linkGroup || $loading.get(linkGroup.id)) {
      return;
    }
    linkGroupStore.set(linkGroup);
    const storeValue = get(linkGroupStore);
    if (storeValue) {
      goto(`/admin/create?name=${storeValue.name}`);
    }
  }

  async function deleteOnClick() {
    if (!linkGroup || $loading.get(linkGroup.id)) {
      return;
    }
    loading.updateLoadingForId(linkGroup.id, true);
    await ApiWrapper.delete(`/api/link-groups/delete/${linkGroup.id}`);
    invalidateAll().then(() => loading.updateLoadingForId(linkGroup.id, false));
  }

  async function handleStatusChange(event: CustomEvent<ActivateInactivateEventContent>) {
    if (!linkGroup || $loading.get(linkGroup.id)) {
      return;
    }
    loading.updateLoadingForId(linkGroup.id, true);
    switch (event.detail.action) {
      case 'INACTIVATE':
        await ApiWrapper.patch(`/api/link-groups/inactivate/${linkGroup.id}`);
        invalidateAll().then(() => loading.updateLoadingForId(linkGroup.id, false));
        break;
      case 'ACTIVATE':
        await ApiWrapper.patch(`/api/link-groups/activate/${linkGroup.id}`);
        invalidateAll().then(() => loading.updateLoadingForId(linkGroup.id, false));
        break;
    }
  }
</script>

<div class="flex flex-col sm:p-5 p-2 w-full">
  <div class="flex flex-col justify-center h-full">
    <div class="flex flex-row justify-around items-center align-middle">
      <div class="rounded-full sm:w-[90px] w-[60px] border sm:h-[90px] h-[60px]">
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
      <div class="flex flex-col justify-start sm:p-5 p-2 w-[70%] truncate ...">
        <div
          class="mb-2 sm:text-xl text-sm font-medium text-neutral-800 dark:text-neutral-50 flex flex-row justify-between"
        >
          <div>
            {linkGroup.name}
          </div>

          {#if $loading.get(linkGroup.id)}
            <Loader />
          {:else if linkGroup.active}
            <a href="/{linkGroup.name}" target="_blank" class="ml-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="sm:w-6 w-4 sm:h-6 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                ></path>
              </svg>
            </a>
          {:else}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <svg
              on:click="{() => deleteOnClick()}"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="red"
              class="w-6 h-6 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              ></path>
            </svg>
          {/if}
        </div>
        {#if linkGroup.description}
          <p class="mb-4 sm:text-base text-sm text-neutral-600 dark:text-neutral-200">
            {linkGroup.description}{linkGroup.description}{linkGroup.description}
          </p>
        {/if}
        <p class="text-xs text-neutral-500 dark:text-neutral-300">
          Updated: {dayjs(linkGroup.updatedTs).format('MMMM D YYYY h:mm A')}
        </p>
      </div>
    </div>
  </div>

  <div class="flex flex-row justify-between">
    <div class="sm:w-[120px] w-[110px]">
      <StatusButton
        disabled="{$loading.get(linkGroup.id)}"
        status="{!!linkGroup.active}"
        on:clicked="{(e) => handleStatusChange(e)}"
      />
    </div>

    <button
      disabled="{$loading.get(linkGroup.id)}"
      on:click="{() => editOnClick()}"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
    >
      Edit
    </button>
  </div>
</div>
