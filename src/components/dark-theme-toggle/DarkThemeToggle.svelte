<script lang="ts">
  import { slide } from 'svelte/transition'
  import { darkTheme } from '../../stores'

  const toggleDark = () => ($darkTheme = !$darkTheme)

  $: dark = $darkTheme
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="{dark ? 'p-[6px]' : 'p-[9px]'}" on:click="{() => toggleDark()}">
  {#if dark}
    <img class="h-10" src="/src/lib/images/sun.svg" alt="sun" transition:slide />
  {:else}
    <img class="h-8" src="/src/lib/images/moon.svg" alt="moon" transition:slide />
  {/if}
</div>
