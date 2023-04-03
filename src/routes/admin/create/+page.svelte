<script lang="ts">
  import CreatePageWizard from '../../../components/Wizard/CreateLinkGroupWizard.svelte';
  import CreatePageWizardPreview from '../../../components/Wizard/CreateLinkGroupWizardPreview.svelte';

  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="flex flex-row justify-center h-[80vh]">
  <CreatePageWizard data="{data}" linkGroup="{data.linkGroup}" />
  <div class="border-black border-l-2"></div>
  <CreatePageWizardPreview linkGroup="{data.linkGroup}" />
</div>
