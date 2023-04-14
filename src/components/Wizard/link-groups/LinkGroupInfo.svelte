<script lang="ts">
  import { enhance } from '$app/forms';
  import { afterUpdate } from 'svelte';
  import type { RLinkGroup } from '../../../core/models/link-group.dto';
  import { loading, refreshIframe } from '../../../stores';
  import Loader from '../../common/Loader.svelte';
  import { invalidateAll } from '$app/navigation';

  export let linkGroup: RLinkGroup | undefined;

  afterUpdate(() => {
    console.log(linkGroup?.imageURL);
  });

  let avatar: string, fileinput;

  const onFileSelected = (e: any) => {
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      avatar = e.target?.result as string;
    };
  };
</script>

{#if linkGroup && linkGroup.id}
  <form
    class="h-full w-full"
    method="POST"
    action="?/create"
    enctype="multipart/form-data"
    use:enhance="{() => {
      if (!linkGroup) return;
      loading.updateLoadingForId(linkGroup.id, true);
      return async () => {
        if (!linkGroup) return;
        refreshIframe.set(true);
        loading.updateLoadingForId(linkGroup.id, false);
        invalidateAll();
      };
    }}"
  >
    <div class="h-full w-full selection:flex flex-col items-center">
      <div
        class="w-full min-h-[350px] flex flex-col px-8 mt-5 bg-white dark:bg-neutral-700 rounded-lg"
      >
        <h1
          class="mb-4 mt-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl"
        >
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"
            >Header Settings</span
          >
        </h1>
        <div class="pt-4 m-6">
          <div class="flex flex-col">
            <label for="message">Description</label>
            <textarea
              id="message"
              rows="5"
              name="description"
              placeholder="Write a brief intro for your page here..."
              class="block p-2.5 text-sm w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value="{linkGroup.description ?? ''}"></textarea>
          </div>
        </div>
        <div class="pt-1 m-6">
          <label>
            <input style="padding:0" type="color" name="fontColor" value="{linkGroup.fontColor}" />
            Font Color
          </label>
        </div>
        <div class="w-full flex flex-row justify-end mt-5">
          <button
            formaction="?/updateDescription&id={linkGroup?.id}"
            disabled="{$loading.get(linkGroup.id)}"
            class=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          >
            Save
          </button>
          {#if $loading.get(linkGroup.id)}
            <Loader />
          {/if}
        </div>
      </div>

      <div
        class="w-full min-h-[350px] flex flex-col px-8 mt-5 bg-white dark:bg-neutral-700 rounded-lg"
      >
        <div class="flex flex-row justify-between mt-10">
          <div class="flex justify-center w-[50%] min-w-[400px]">
            <div class="rounded-lg shadow-xl bg-gray-50 dark:bg-neutral-600 lg:w-1/2">
              <div class="m-4">
                <label for="formFile" class="inline-block mb-2">Upload Image(jpg,png,jpeg)</label>
                <div class="flex items-center justify-center w-full">
                  <label
                    class="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300"
                  >
                    {#if avatar}
                      <div class="flex flex-row items-center justify-center align-middle">
                        <div class="h-[100px] w-[100px]">
                          <img src="{avatar}" alt="selectedAvatar" class="object-contain" />
                        </div>
                      </div>
                    {:else}
                      <div class="flex flex-col items-center justify-center pt-7">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clip-rule="evenodd"></path>
                        </svg>
                        <p
                          class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600"
                        >
                          Select a photo
                        </p>
                      </div>
                    {/if}

                    <input
                      on:change="{(e) => onFileSelected(e)}"
                      bind:this="{fileinput}"
                      class="opacity-0"
                      type="file"
                      accept="image/*"
                      name="image"
                      id="formFile"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col align-middle items-center justify-center w-[50%] min-w-[400px]">
            {#if linkGroup?.imageURL}
              <span>Current Image </span>

              <div class="rounded-full w-[120px] border h-[120px]">
                <img
                  class="h-full w-full object-fill rounded-full"
                  alt="link-group-header"
                  src="{linkGroup.imageURL}"
                />
              </div>
            {/if}
          </div>
        </div>
        <div class="w-full flex flex-row justify-end">
          <button
            formaction="?/uploadImage&id={linkGroup.id}"
            disabled="{$loading.get(linkGroup.id)}"
            class=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          >
            Upload
          </button>
          {#if $loading.get(linkGroup.id)}
            <Loader />
          {/if}
        </div>
      </div>
    </div>
  </form>
{/if}
