<script lang="ts">
  import { PUBLIC_APP_URL } from '$env/static/public';
  import type { RLinkGroup } from '../../core/models/link-group.dto';
  import { refreshIframe } from '../../stores';
  import Iframe from '../common/Iframe.svelte';
  import Loader from '../common/Loader.svelte';
  export let linkGroup: RLinkGroup;
  let iFrameUrl = PUBLIC_APP_URL + linkGroup.name;

  refreshIframe.subscribe((x) => {
    if (x === true) {
      iFrameUrl = '';
      setTimeout(() => {
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
    class="border-black rounded-3xl border-2 ml-4 mr-4 mt-20 h-[80%] w-min-[250px] w-[350px] bg-slate-200 flex flex-row justify-center"
  >
    {#if iFrameUrl === ''}
      <Loader />
    {:else}
      <Iframe app="stock" url="{iFrameUrl}" />
    {/if}
  </div>
</div>
