<script lang="ts">
  export let placeholder: string;
  export let id: string;
  export let type: string;
  export let label: string;
  export let required = false;
  export let displayLabel = false;
</script>

<div class="mb-6">
  {#if displayLabel}
    <label for="{id}" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>
  {/if}
  <input
    type="{type}"
    id="{id}"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="{placeholder}"
    required="{required}"
  />
</div>
