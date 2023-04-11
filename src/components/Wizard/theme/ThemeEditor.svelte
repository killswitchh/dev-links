<script lang="ts">
  import type { RLinkGroup } from '../../../core/models/link-group.dto';
  import BackgroundPicker from './BackgroundPicker.svelte';
  import ButtonPicker from './ButtonPicker.svelte';

  export let linkGroup: RLinkGroup;
</script>

<ButtonPicker theme="{linkGroup?.theme}" />
<BackgroundPicker theme="{linkGroup?.theme}" />
