<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import type { Link } from '../../../core/models/link.dto';
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
    <div class="mt-2 w-[50%] p-2 bg-white dark:bg-slate-700 rounded-xl">
      <div class=" flex flex-col items-center">
        <div>name: {link.name}</div>
        <div>url: {link.url}</div>
        <div>provider: {link.provider}</div>
        <div>active: {link.active}</div>
        <div>enrich: {link.enrich}</div>
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
