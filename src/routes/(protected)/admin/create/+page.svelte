<script lang="ts">
  import { afterUpdate } from 'svelte';
  import CreateLinkGroupWizard from '../../../../components/Wizard/CreateLinkGroupWizard.svelte';
  import CreateLinkGroupWizardPreview from '../../../../components/Wizard/CreateLinkGroupWizardPreview.svelte';
  import type { RLinkGroup } from '../../../../core/models/link-group.dto';

  import type { PageData } from './$types';

  export let data: PageData;
  let linkGroup: RLinkGroup = data.linkGroup;
  afterUpdate(() => (linkGroup = data.linkGroup));
</script>

<div class="flex flex-row justify-center h-[88vh] relative">
  <CreateLinkGroupWizard data="{data}" linkGroup="{linkGroup}" />
  <CreateLinkGroupWizardPreview linkGroup="{linkGroup}" />
</div>
