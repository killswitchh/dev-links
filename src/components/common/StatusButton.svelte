<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { ActivateInactivateEvent } from '../../core/models/theme.dto';

  export let status: boolean;
  export let disabled: boolean = false;

  const dispatch = createEventDispatcher<ActivateInactivateEvent>();

  function buttonClicked() {
    dispatch('clicked', { action: status ? 'INACTIVATE' : 'ACTIVATE' });
  }
</script>

<button
  class="{status ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'} 
      text-white font-bold py-2 px-4 rounded mt-2"
  on:click="{buttonClicked}"
  disabled="{disabled}"
>
  {status ? 'Inactivate' : 'Activate'}
</button>
