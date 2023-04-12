<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import type { Link } from '@prisma/client';
  import type { ActivateInactivateEventContent } from '../../../core/models/theme.dto';
  import type { PageData } from '../../../routes/(protected)/admin/create/$types';
  import { ApiWrapper } from '../../../service/api-wrapper.service';
  import { editLinkToggleStore, loading, refreshIframe } from '../../../stores';
  import Loader from '../../common/Loader.svelte';
  import StatusButton from '../../common/StatusButton.svelte';
  import CreateLink from './CreateLink.svelte';

  export let link: Link;
  export let data: PageData;

  async function handleStatusChange(event: CustomEvent<ActivateInactivateEventContent>) {
    if (!link || $loading.get(link.id)) {
      return;
    }
    switch (event.detail.action) {
      case 'INACTIVATE':
        await ApiWrapper.patch(`/api/links/inactivate/${link.id}`);
        invalidateAll().then(() => {
          refreshIframe.set(true);
          loading.updateLoadingForId(link.id, false);
        });
        break;
      case 'ACTIVATE':
        await ApiWrapper.patch(`/api/links/activate/${link.id}`);
        invalidateAll();
        invalidateAll().then(() => {
          refreshIframe.set(true);
          loading.updateLoadingForId(link.id, false);
        });
        break;
    }
  }
  async function deleteOnClick() {
    if (!link || $loading.get(link.id)) {
      return;
    }
    loading.updateLoadingForId(link.id, true);
    await ApiWrapper.delete(`/api/links/delete/${link.id}`);
    invalidateAll().then(() => loading.updateLoadingForId(link.id, false));
  }
  $: enrichedName = () => data.providers.find((x) => x.code === link.provider)?.name;
</script>

{#if link && link.id}
  {#if $editLinkToggleStore.get(link.id) === undefined || $editLinkToggleStore.get(link.id) === false}
    <div class="mt-4 w-[60%] p-5 bg-white dark:bg-neutral-700 rounded-xl">
      <div class="flex flex-col">
        <div class="flex flex-row justify-between mb-5">
          <div class="flex flex-row justify-start">
            <div>{link.name ? link.name : link.provider}</div>
            <a class="ml-5" href="{link.url}" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                ></path>
              </svg>
            </a>
          </div>
          <div class="flex flex-row justify-end">
            {#if link.enrich}
              <span
                class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                >{enrichedName()} ✨
              </span>
            {/if}

            {#if link.active}
              <span
                class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
              >
                Active
              </span>
            {:else}
              <span
                class="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                >Inactive</span
              >
            {/if}
            {#if $loading.get(link.id)}
              <Loader />
            {:else if !link.active}
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
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <StatusButton status="{!!link.active}" on:clicked="{(e) => handleStatusChange(e)}" />
        <button
          on:click="{() => editLinkToggleStore.updateToggleValue(link.id, true)}"
          class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Edit
        </button>
      </div>
    </div>
  {:else}
    <CreateLink data="{data}" currentLink="{link}" />
  {/if}
{/if}
