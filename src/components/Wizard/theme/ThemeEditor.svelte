<script lang="ts">
  import type { LinkGroup } from '../../../core/models/link-group.dto';
  import BackgroundPicker from './BackgroundPicker.svelte';
  import ButtonPicker from './ButtonPicker.svelte';

  export let linkGroup: LinkGroup | undefined;
</script>

<ButtonPicker theme="{linkGroup?.theme}" />
<BackgroundPicker theme="{linkGroup?.theme}" />
