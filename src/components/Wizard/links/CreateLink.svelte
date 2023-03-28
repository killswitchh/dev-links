<script lang="ts">
  import Select from 'svelte-select';
  import type { Link } from '../../../core/models/link.dto';
  import { Provider } from '../../../core/models/link.dto';

  let providers: Provider[] = [
    Provider.BITBUCKET,
    Provider.GITHUB,
    Provider.CODEFORCES,
    Provider.HACKEREARTH,
    Provider.OTHER,
  ];

  let createLinkRequest: Partial<Link> = {};

  function getSwitchValue(event: any) {
    const target = event.target;
    const state = target?.getAttribute('aria-checked');
    return state === 'true' ? false : true;
  }

  function createLink(e: any): any {
    console.log(createLinkRequest);
  }
</script>

<div>Create Link</div>
<form>
  <div>
    <div class="mt-3">
      <Select
        required
        placeholder="Select Provider"
        on:change="{(e) => (createLinkRequest.provider = e.detail.value)}"
        on:clear="{() => (createLinkRequest.provider = undefined)}"
        items="{providers}"
      />
    </div>
    <div class="mt-3">
      <input
        type="text"
        id="link-name"
        bind:value="{createLinkRequest.url}"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter your URL"
        required
      />
    </div>

    <div class="mt-3">
      <input
        class="mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary"
        type="checkbox"
        role="switch"
        aria-checked="{createLinkRequest.prioritize}"
        required
        on:click="{(e) => (createLinkRequest.prioritize = getSwitchValue(e))}"
        id="link-name"
      />
      <label class="inline-block pl-[0.15rem] hover:cursor-pointer" for="flexSwitchCheckDefault"
        >Prioritize</label
      >
    </div>
    {#if createLinkRequest.provider && createLinkRequest.provider !== 'OTHER'}
      <div class="mt-3">
        <input
          class="mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary"
          type="checkbox"
          role="switch"
          aria-checked="{createLinkRequest.enrich}"
          required
          on:click="{(e) => (createLinkRequest.enrich = getSwitchValue(e))}"
          id="link-name"
        />
        <label class="inline-block pl-[0.15rem] hover:cursor-pointer" for="flexSwitchCheckDefault"
          >Enrich</label
        >
      </div>
    {/if}
    <div class="flex flex-row justify-end">
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        on:click="{(e) => createLink(e)}"
      >
        Save
      </button>
    </div>
  </div>
</form>
