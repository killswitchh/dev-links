<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import type { Link } from '@prisma/client';
  import type { ActivateInactivateEventContent } from '../../../core/models/theme.dto';
  import type { PageData } from '../../../routes/(protected)/admin/create/$types';
  import { ApiWrapper } from '../../../service/api-wrapper.service';
  import { editLinkToggleStore, refreshIframe } from '../../../stores';
  import StatusButton from '../../common/StatusButton.svelte';
  import CreateLink from './CreateLink.svelte';

  export let link: Link;
  export let data: PageData;

  async function handleStatusChange(event: CustomEvent<ActivateInactivateEventContent>) {
    if (!link) {
      return;
    }
    switch (event.detail.action) {
      case 'INACTIVATE':
        await ApiWrapper.patch(`/api/links/inactivate/${link.id}`);
        invalidateAll();
        refreshIframe.set(true);
        break;
      case 'ACTIVATE':
        await ApiWrapper.patch(`/api/links/activate/${link.id}`);
        invalidateAll();
        refreshIframe.set(true);
        break;
    }
  }
</script>

{#if link && link.id}
  {#if $editLinkToggleStore.get(link.id) === undefined || $editLinkToggleStore.get(link.id) === false}
    <div class="mt-4 w-[50%] p-5 bg-white dark:bg-neutral-700 rounded-xl">
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
          <div>
            {#if link.enrich}
              <span
                class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                >Enriched</span
              >
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
