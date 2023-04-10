<script lang="ts">
  import { fade } from 'svelte/transition';

  export let key: string;
  export let duration: number = 300;
</script>

{#key key}
  <div in:fade="{{ duration, delay: duration }}">
    <slot />
  </div>
{/key}

<style>
  div {
    position: absolute;
    inset: 0;
  }
</style>
