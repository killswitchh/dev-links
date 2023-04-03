<script lang="ts">
  import { enhance } from '$app/forms';
  import type { LinkGroup } from '../../../core/models/link-group.dto';

  export let linkGroup: LinkGroup | undefined;
</script>

<form class="h-full w-full" method="POST" action="?/create" use:enhance>
  <div class="h-full w-full selection:flex flex-col items-center">
    <div class="h-[50%]">
      <div class="pt-4 flex flex-row justify-between m-6">
        <textarea
          placeholder="Enter Description"
          rows="5"
          name="description"
          class="w-[70%] resize-y rounded-md"
          value="{linkGroup?.description ?? ''}"></textarea>
        <button
          formaction="?/updateDescription"
          class="h-[20%] text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        >
          Save
        </button>
      </div>
    </div>
    <div class="h-[50%]">
      {#if linkGroup?.imageURL}
        Current Image: <img alt="linkGroup" src="{linkGroup.imageURL}" />
      {/if}
      <div class="pt-4 flex flex-row justify-between m-6">
        <div class="w-[70%]">
          <input
            name="image"
            class="w-full relative m-0 block min-w-[70%] flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
            id="formFile"
            type="file"
          />
        </div>
        <button
          formaction="?/uploadImage"
          class="h-[20%] text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        >
          Upload
        </button>
      </div>
    </div>
  </div>
</form>
