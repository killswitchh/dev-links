<script lang="ts">
  import type { LinkGroup } from '../../../core/models/link-group.dto';

  export let linkGroup: LinkGroup;
</script>

<div class="flex flex-col justify-start p-6">
  <h5 class="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
    {linkGroup.id}
  </h5>
  <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
    {linkGroup.name}
  </p>
  <p class="text-xs text-neutral-500 dark:text-neutral-300">
    Last updated {linkGroup.updatedTs}
  </p>
</div>
