<script lang="ts">
  import { Steps } from 'svelte-steps';
  import type { RLinkGroup } from '../../core/models/link-group.dto';
  import type { PageData } from '../../routes/(protected)/admin/create/$types';
  import { wizardStore, type WizardStep } from '../../stores';
  import LinkGroupInfo from './link-groups/LinkGroupInfo.svelte';
  import CreateLinks from './links/CreateLinks.svelte';
  import CreateTheme from './theme/ThemeEditor.svelte';

  let wizardSteps: WizardStep[] = [];
  wizardStore.subscribe((x) => {
    wizardSteps = x.steps;
  });

  export let linkGroup: RLinkGroup;
  export let data: PageData;

  let currentStep = 0;

  const buttonClicked = (e: CustomEvent<any>) => {
    currentStep = e.detail.current;
  };

  const updateCurrentStep = (incrementer: number, disabled: boolean) => {
    if (disabled) {
      return;
    }
    currentStep += incrementer;
  };

  $: isLastStep = () => currentStep === wizardSteps.length - 1;
</script>

<div class="sm:w-[70%] w-full border-l-amber-900 flex flex-row justify-center">
  <div class="h-full w-full py-4">
    <div class="h-full w-full container sm:mx-auto">
      <Steps
        size="2rem"
        line="2rem"
        steps="{wizardSteps}"
        current="{currentStep}"
        on:click="{(e) => buttonClicked(e)}"
      />
      <div
        class="m-2 sm:w-auto w-full sm:mx-12 min-h-[80%] h-[80%] overflow-auto bg-white/50 dark:border-[#2e2e2e] dark:border dark:bg-[#0A0A0A] backdrop-blur-sm rounded-xl flex flex-col items-center scrollbar-width dark:scrollbar-bg-dark scrollbar-bg-light"
      >
        {#if currentStep == 0}
          <LinkGroupInfo linkGroup="{linkGroup}" />
        {/if}
        {#if currentStep == 1}
          <CreateLinks links="{linkGroup.links}" data="{data}" />
        {/if}
        {#if currentStep == 2}
          <CreateTheme linkGroup="{linkGroup}" defaultTheme="{data.defaultTheme}" />
        {/if}
      </div>
      <div class="m-2 flex flex-row justify-between mx-12">
        <button
          type="button"
          disabled="{currentStep <= 0}"
          class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          on:click="{() => updateCurrentStep(-1, currentStep <= 0)}"
        >
          Previous
        </button>

        {#if currentStep !== wizardSteps.length - 1}
          <button
            type="button"
            disabled="{currentStep > wizardSteps.length}"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none min-w-[98px]"
            on:click="{() => updateCurrentStep(1, currentStep > wizardSteps.length - 1)}"
          >
            {isLastStep() ? 'Create' : 'Next'}
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>
