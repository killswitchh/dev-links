<script lang="ts">
  import type { Link } from '@prisma/client';
  import { get } from 'svelte/store';
  import { slide } from 'svelte/transition';
  import { superForm } from 'sveltekit-superforms/client';
  import {
    CreateLinkRequestSchema,
    convertToCreateLinkRequest,
    type CreateLinkRequest,
  } from '../../../core/models/link.dto';
  import { getProvider } from '../../../core/utils/providerutils';
  import { debounce } from '../../../core/utils/utils';
  import type { PageData } from '../../../routes/(protected)/admin/create/$types';
  import { editLinkToggleStore, loading, refreshIframe } from '../../../stores';
  import Loader from '../../common/Loader.svelte';

  export let data: PageData;
  export let currentLink: Link | undefined = undefined; // for editing

  const { form, errors, enhance } = superForm(data.form, {
    taintedMessage: null,
    validators: CreateLinkRequestSchema,
    dataType: 'json',
    onSubmit: () => {
      loading.updateLoadingForId('create-link-button', true);
    },
    onResult: ({ result }) => {
      const res = result as unknown as { data: { id: string } };
      editLinkToggleStore.updateToggleValue(res.data.id, false);
      loading.updateLoadingForId('create-link-button', false);
      refreshIframe.set(true);
    },
  });

  const debouncedHandleInput = debounce(() => {
    const provider = getProvider($form.url);
    if (provider) {
      const formValue = get(form);
      formValue.provider = provider;
      form.set(formValue);
    }
  }, 500);

  if (currentLink) {
    const provider = currentLink.provider;
    const createLinkReqeust: CreateLinkRequest = convertToCreateLinkRequest(currentLink, provider);
    form.set(createLinkReqeust);
  } else {
    const formValue = get(form);
    formValue.provider = undefined;
    form.set(formValue);
  }
  form.subscribe((x) => {
    if (x.provider) {
      providerString = data.providers.find((x) => x.code === $form.provider)?.name;
    }
  });

  $: providerString = data.providers.find((x) => x.code === $form.provider)?.name;
</script>

<div
  class="mt-5 mb-2 min-w-[60%] bg-white dark:bg-neutral-900 rounded-xl flex flex-col items-center"
>
  <div class="mt-2">Create Link</div>
  <form
    method="POST"
    action="?/link&name={data.linkGroup.name}&id={currentLink ? currentLink.id : null}"
    use:enhance
  >
    <div class="min-w-[300px]">
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
          <small class="text-danger">{$errors.name}</small>
        {/if}
      </div>
      <div class="mt-3">
        <input
          type="text"
          name="url"
          id="link-name"
          on:keyup="{(e) => debouncedHandleInput()}"
          bind:value="{$form.url}"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your URL"
          required
        />
        {#if $errors.url}
          <small class="text-danger">{$errors.url}</small>
        {/if}
      </div>

      {#if $form.provider && $form.provider !== 'OTHER'}
        <div transition:slide>
          <div class="mt-3">
            We can enhance this {providerString} link! ✨
          </div>
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
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Enhance
              </span>
            </label>
          </div>
        </div>
      {/if}
      <div class="flex flex-row justify-end mt-3">
        {#if currentLink && currentLink.id}
          <button
            type="submit"
            on:click="{() => editLinkToggleStore.updateToggleValue(currentLink?.id, false)}"
            class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none min-w-[98px]"
          >
            Close
          </button>
        {/if}
        <button
          type="submit"
          disabled="{$loading.get('create-link-button')}"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none min-w-[98px]"
        >
          Save
        </button>
        {#if $loading.get('create-link-button')}
          <Loader />
        {/if}
      </div>
    </div>
  </form>
</div>
