<script lang="ts">
  import type { NullSafePageItem } from '../types';
  export let page: NullSafePageItem;
</script>

<div
  class="w-[40%] flex flex-col rounded-lg bg-white shadow-lg dark:bg-neutral-700 md:max-w-xl md:flex-row justify-center"
>
  {#if !page}
    <a href="/create">
      <div class="flex flex-col justify-start p-6 hover:cursor-pointer">
        <h5 class="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">+ Add Page</h5>
      </div>
    </a>
  {:else}
    <div class="flex flex-col justify-start p-6">
      <h5 class="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
        {page.id}
      </h5>
      <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
        {page.name}
      </p>
      <p class="text-xs text-neutral-500 dark:text-neutral-300">
        Last updated {page.updatedTs}
      </p>
    </div>
  {/if}
</div>
