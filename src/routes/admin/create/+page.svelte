<script lang="ts">
  import CreatePageWizard from '../../../components/Wizard/CreatePageWizard.svelte';
  import CreatePageWizardPreview from '../../../components/Wizard/CreatePageWizardPreview.svelte';

  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="flex flex-row justify-center h-[80vh]">
  <CreatePageWizard data="{data}" page="{data.page}" />
  <div class="border-black border-l-2"></div>
  <CreatePageWizardPreview page="{data.page}" />
</div>
