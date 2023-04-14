<script lang="ts">
  import type { RLinkGroup } from '../../../core/models/link-group.dto';
  import type { RTheme } from '../../../core/models/theme.dto';
  import BackgroundPicker from './BackgroundPicker.svelte';
  import ButtonPicker from './ButtonPicker.svelte';

  export let linkGroup: RLinkGroup;
  export let defaultTheme: RTheme;
</script>

<ButtonPicker theme="{linkGroup?.theme}" defaultTheme="{defaultTheme}" />
<BackgroundPicker theme="{linkGroup?.theme}" />
