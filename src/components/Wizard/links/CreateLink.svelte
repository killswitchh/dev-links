<script lang="ts">
  import Select from 'svelte-select';

  import { superForm } from 'sveltekit-superforms/client';

  import type { Link, Provider } from '@prisma/client';
  import { get } from 'svelte/store';
  import {
    CreateLinkRequestSchema,
    convertToCreateLinkRequest,
    type CodeName,
    type CreateLinkRequest,
    type SelectValue,
  } from '../../../core/models/link.dto';
  import { convertToName } from '../../../core/utils/utils';
  import type { PageData } from '../../../routes/(protected)/admin/create/$types';
  import { editLinkToggleStore, refreshIframe } from '../../../stores';

  export let data: PageData;
  export let currentLink: Link | undefined = undefined; // for editing

  const { form, errors, enhance } = superForm(data.form, {
    taintedMessage: 'Are you sure you want leave?',
    validators: CreateLinkRequestSchema,
    dataType: 'json',
    onResult: ({ result }) => {
      console.log('[RESULT]', result);
      const res = result as unknown as { data: { id: string } };
      editLinkToggleStore.updateToggleValue(res.data.id, false);
      refreshIframe.set(true);
    },
  });

  if (currentLink) {
    const provider: SelectValue = {
      code: currentLink.provider as Provider,
      name: convertToName(currentLink.provider as string) as string,
      index: data.providers.find((x: CodeName<Provider>) => x.code === currentLink?.provider)
        ?.index,
    };
    const createLinkReqeust: CreateLinkRequest = convertToCreateLinkRequest(currentLink, provider);
    form.set(createLinkReqeust);
  } else {
    const formValue = get(form);
    formValue.provider = undefined;
    form.set(formValue);
  }
</script>

<div class="mt-2 mb-2 w-[50%] bg-white dark:bg-neutral-700 rounded-xl flex flex-col items-center">
  <div>Create Link</div>
  <form
    method="POST"
    action="?/link&name={data.linkGroup.name}&id={currentLink ? currentLink.id : null}"
    use:enhance
  >
    <div>
      <div class="mt-3">
        <Select
          class="dark: bg-slate-700 dark:text-black"
          name="provider"
          itemId="code"
          label="name"
          required
          bind:value="{$form.provider}"
          placeholder="Select Provider"
          items="{data.providers}"
        />
      </div>
      <div class="mt-3">
        <input
          type="text"
          name="url"
          id="link-name"
          bind:value="{$form.url}"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your URL"
          required
        />
        {#if $errors.url}
          <small>{$errors.url}</small>
        {/if}
      </div>
      <div class="mt-3">
        <input
          type="text"
          name="name"
          id="link-name"
          bind:value="{$form.name}"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Give this link a name"
          required
        />
        {#if $errors.name}
          <small>{$errors.name}</small>
        {/if}
      </div>

      <div class="mt-3">
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            name="prioritize"
            type="checkbox"
            class="sr-only peer"
            bind:checked="{$form.prioritize}"
          />
          <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
          ></div>
          <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Prioritize</span>
        </label>
      </div>

      {#if $form.provider && $form.provider.code !== 'OTHER'}
        <div class="mt-3">
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              name="enrich"
              type="checkbox"
              class="sr-only peer"
              bind:checked="{$form.enrich}"
            />
            <div
              class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
            ></div>
            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Enrich</span>
          </label>
        </div>
      {/if}
      <div class="flex flex-row justify-end">
        {#if currentLink && currentLink.id}
          <button
            type="submit"
            on:click="{() => editLinkToggleStore.updateToggleValue(currentLink?.id, false)}"
            class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          >
            Close
          </button>
        {/if}
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        >
          Save
        </button>
      </div>
    </div>
  </form>
</div>
