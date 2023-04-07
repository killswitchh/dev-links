<script lang="ts">
  import CreateLinkGroupWizard from '../../../../components/Wizard/CreateLinkGroupWizard.svelte';
  import CreateLinkGroupWizardPreview from '../../../../components/Wizard/CreateLinkGroupWizardPreview.svelte';

  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="flex flex-row justify-center h-[80vh]">
  <CreateLinkGroupWizard data="{data}" linkGroup="{data.linkGroup}" />
  <div class="border-black border-l-2"></div>
  <CreateLinkGroupWizardPreview linkGroup="{data.linkGroup}" />
</div>
