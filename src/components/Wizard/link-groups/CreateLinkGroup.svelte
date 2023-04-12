<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import { LinkGroupNameSchema } from '../../../core/models/link-group.dto';
  import type { PageData } from '../../../routes/(protected)/admin/links/$types';

  let displayForm: boolean;
  export let data: PageData;

  const { form, errors, enhance } = superForm(data.form, {
    validators: LinkGroupNameSchema,
    dataType: 'json',
  });
</script>

{#if !displayForm}
  <div class="flex flex-col justify-start p-6 hover:cursor-pointer">
    <button
      class="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50"
      on:click="{() => (displayForm = !displayForm)}"
    >
      + Add LinkGroup
    </button>
  </div>
{:else}
  <div class="flex flex-col justify-start p-6 hover:cursor-pointer">
    <form method="POST" action="?/createPage" use:enhance>
      <div>
        <div class="flex flex-row justify-between">
          <div>
            <input
              type="text"
              name="name"
              bind:value="{$form.name}"
              id="link-name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Claim your Dev page!"
              required
            />
            {#if $errors.name}
              <small class="text-danger">{$errors.name}</small>
            {/if}
          </div>
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
{/if}
