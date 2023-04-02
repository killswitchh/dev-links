<script lang="ts">
  import Select from 'svelte-select';
  import { superForm } from 'sveltekit-superforms/client';
  import { CreateLinkRequestSchema, Provider } from '../../../core/models/link.dto';
  import type { PageData } from '../../../routes/create/$types';

  let providers: Provider[] = [
    Provider.BITBUCKET,
    Provider.GITHUB,
    Provider.CODEFORCES,
    Provider.HACKEREARTH,
    Provider.OTHER,
  ];

  export let data: PageData;

  const { form, errors, enhance, constraints } = superForm(data.form, {
    taintedMessage: 'Are you sure you want leave?',
    validators: CreateLinkRequestSchema,
    dataType: 'json',
  });
</script>

<div>Create Link</div>
<form method="POST" action="/create?/link" use:enhance>
  <div>
    <div class="mt-3">
      <Select
        class="dark: bg-slate-700 dark:text-black"
        name="provider"
        required
        placeholder="Select Provider"
        bind:value="{$form.provider}"
        items="{providers}"
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

    {#if $form.provider && $form.provider.value !== 'OTHER'}
      <div class="mt-3">
        <label class="relative inline-flex items-center cursor-pointer">
          <input name="enrich" type="checkbox" class="sr-only peer" bind:checked="{$form.enrich}" />
          <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
          ></div>
          <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Enrich</span>
        </label>
      </div>
    {/if}
    <div class="flex flex-row justify-end">
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
      >
        Save
      </button>
    </div>
  </div>
</form>
