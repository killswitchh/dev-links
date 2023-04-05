<script lang="ts">
  import { PUBLIC_APP_URL } from '$env/static/public';
  import type { LinkGroup } from '../../core/models/link-group.dto';
  import { refreshIframe } from '../../stores';
  import Iframe from '../common/Iframe.svelte';
  import Loader from '../common/Loader.svelte';
  export let linkGroup: LinkGroup;
  let iFrameUrl = PUBLIC_APP_URL + linkGroup.name;

  console.log('im getting remounted', linkGroup);

  refreshIframe.subscribe((x) => {
    if (x === true) {
      iFrameUrl = '';
      console.log('iframe URL set to none');
      setTimeout(() => {
        console.log('setting after interval');
        refreshIframe.set(false);
        iFrameUrl = PUBLIC_APP_URL + linkGroup.name;
      }, 1000);
    } else {
      iFrameUrl = PUBLIC_APP_URL + linkGroup.name;
    }
  });
</script>

<div class="w-[30%] border-l-amber-900 flex flex-row justify-center">
  <div
    class="border-black rounded-3xl border-2 ml-4 mr-4 mt-20 h-2/3 w-min-[250px] w-[250px] bg-slate-200 flex flex-row justify-center"
  >
    {#if iFrameUrl === ''}
      <Loader />
    {:else}
      <Iframe app="stock" url="{iFrameUrl}" />
    {/if}
  </div>
</div>
