<script lang="ts">
  import type { Page } from '../../../core/models/page.dto';

  export let page: Page;
</script>

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
