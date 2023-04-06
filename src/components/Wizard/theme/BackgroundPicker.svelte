<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import {
    BackgroundType,
    type BackgroundChangeEventContent,
    type Theme,
  } from '../../../core/models/theme.dto';
  import { ApiWrapper } from '../../../service/api-wrapper.service';
  import { refreshIframe } from '../../../stores';
  import Background from '../../consumer/Background.svelte';

  export let theme: Theme | undefined;

  const backgroundTypeList: BackgroundType[] = Object.values(BackgroundType);

  function handleBackgroundChange(event: CustomEvent<BackgroundChangeEventContent>) {
    if (!theme) {
      return;
    }
    theme.background.backgroundType = event.detail.backgroundType;
  }

  async function saveBackgroundLayout() {
    const backgroundEvent = await ApiWrapper.patch('/api/theme/background', theme?.background);
    refreshIframe.set(true);
    invalidateAll();
    return backgroundEvent;
  }
</script>

<div class="w-full flex flex-col items-center mt-5">
  <div>Background Settings</div>
  {#if theme != null}
    <div class="mt-5 flex flex-row justify-between w-[80%]">
      <span class="p-2"> Style </span>

      {#each backgroundTypeList as backgroundType}
        <div
          class="{backgroundType === theme.background.backgroundType
            ? 'border-b-4 p-1'
            : ''}  h-[300px] w-[150px] outline-1 outline rounded"
        >
          <Background
            on:selected="{(e) => handleBackgroundChange(e)}"
            displayBackgroundType="{true}"
            backgroundType="{backgroundType}"
            backgroundColor="{theme.background.backgroundColor}"
            gradientStops="{theme.background.gradientStops}"
            imageUrl="{theme.background.imageUrl}"
          />
        </div>
      {/each}
    </div>

    <div class="mt-5 flex flex-row justify-around w-[80%]">
      {#if theme.background.backgroundType === BackgroundType.FILL}
        <label>
          <input style="padding:0" type="color" bind:value="{theme.background.backgroundColor}" />
          Background Color
        </label>
      {/if}
      {#if theme.background.backgroundType === BackgroundType.GRADIENT && theme.background.gradientStops?.length == 2}
        <label>
          <input
            style="padding:0"
            type="color"
            bind:value="{theme.background.gradientStops[0].color}"
          />
          Gradient Primary Color
        </label>
        <label>
          <input
            style="padding:0"
            type="color"
            bind:value="{theme.background.gradientStops[1].color}"
          />
          Gradient Secondary Color
        </label>
      {/if}
      {#if theme.background.backgroundType === BackgroundType.IMAGE}
        <div class="pt-4 flex flex-row justify-between m-6">
          <div class="w-[70%]">
            <input
              name="image"
              class="w-full relative m-0 block min-w-[70%] flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
              id="formFile"
              bind:value="{theme.background.imageUrl}"
              type="file"
            />
          </div>
          <button
            class=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          >
            Upload
          </button>
        </div>
      {/if}
    </div>
  {/if}
  <button
    on:click="{(event) => saveBackgroundLayout()}"
    class=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
  >
    Save
  </button>
</div>
