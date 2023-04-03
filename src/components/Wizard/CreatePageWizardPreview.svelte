<script lang="ts">
  import { PUBLIC_APP_URL } from '$env/static/public';
  import type { Page } from '../../core/models/page.dto';
  import Iframe from '../common/Iframe.svelte';
  export let page: Page;
</script>

<div class="w-[30%] border-l-amber-900 flex flex-row justify-center">
  <div
    class="border-black rounded-3xl border-2 ml-4 mr-4 mt-20 h-2/3 w-min-[250px] w-[250px] bg-yellow-300 flex flex-row justify-center"
  >
    <div>
      <Iframe app="stock" url="{PUBLIC_APP_URL + page.name}" />
    </div>
  </div>
</div>
