<script lang="ts">
  import type { Page } from '../../../core/models/page.dto';
  import BackgroundPicker from './BackgroundPicker.svelte';
  import ButtonPicker from './ButtonPicker.svelte';

  export let page: Page | undefined;
</script>

{page?.theme.id}
<ButtonPicker />
<BackgroundPicker />
