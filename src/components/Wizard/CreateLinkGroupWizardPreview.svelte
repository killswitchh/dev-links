<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { PUBLIC_APP_URL } from '$env/static/public';
  import { afterUpdate, beforeUpdate, onMount } from 'svelte';
  import type { LinkGroup } from '../../core/models/link-group.dto';
  import Iframe from '../common/Iframe.svelte';
  export let linkGroup: LinkGroup;
  let iFrameUrl = '';

  onMount(() => {
    iFrameUrl = '';
  });

  beforeUpdate(() => {
    console.log('before updating');
    iFrameUrl = '';
    iFrameUrl = PUBLIC_APP_URL + linkGroup.name;
  });

  afterUpdate(async () => {
    console.log('updating');
    iFrameUrl = PUBLIC_APP_URL + linkGroup.name;
  });
</script>

<div class="w-[30%] border-l-amber-900 flex flex-row justify-center">
  <div
    class="border-black rounded-3xl border-2 ml-4 mr-4 mt-20 h-2/3 w-min-[250px] w-[250px] bg-yellow-300 flex flex-row justify-center"
  >
    <Iframe app="stock" url="{iFrameUrl}" />
  </div>
</div>
