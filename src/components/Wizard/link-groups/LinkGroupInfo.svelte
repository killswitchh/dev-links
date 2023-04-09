<script lang="ts">
  import { enhance } from '$app/forms';
  import type { LinkGroup } from '../../../core/models/link-group.dto';
  import { refreshIframe } from '../../../stores';

  export let linkGroup: LinkGroup | undefined;

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

<form
  class="h-full w-full"
  method="POST"
  action="?/create"
  enctype="multipart/form-data"
  use:enhance="{() => {
    return async () => {
      refreshIframe.set(true);
    };
  }}"
>
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
          formaction="?/updateDescription&id={linkGroup?.id}"
          class="h-[20%] text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        >
          Save
        </button>
      </div>
    </div>
    <div class="h-[50%]">
      <div class="pt-4 flex flex-row justify-between m-6">
        <div class="w-[70%]">
          <div class="mb-3 w-96">
            {#if avatar}
              Selected Image
              <img width="100px" height="100px" src="{avatar}" alt="d" />
            {/if}
            {#if linkGroup?.imageURL}
              Current Header Image: <img
                alt="linkGroup"
                width="100px"
                height="100px"
                src="{linkGroup.imageURL}"
              />
            {/if}
            <label for="formFile" class="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
              >Header</label
            >
            <input
              on:change="{(e) => onFileSelected(e)}"
              bind:this="{fileinput}"
              class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
              type="file"
              accept="image/*"
              name="image"
              id="formFile"
            />
          </div>
        </div>
        <button
          formaction="?/uploadImage&id={linkGroup?.id}"
          class="h-[20%] text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        >
          Upload
        </button>
      </div>
    </div>
  </div>
</form>
